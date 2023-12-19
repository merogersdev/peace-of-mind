import { createContext, useState, useMemo } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState(null);
  const [entries, setEntries] = useState(null);
  const refreshAuth = async () => {
    const response = await axios.get("/auth", {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });
    setUser(response.data.user);
    setQuote(response.data.quote);
    setEntries(response.data.entries);
  };

  // Memoize the context
  const authProviderValue = useMemo(
    () => ({
      user,
      quote,
      entries,
      setUser,
      setQuote,
      setEntries,
      refreshAuth,
    }),
    [user, quote, entries, setUser, setQuote, setEntries, refreshAuth]
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
