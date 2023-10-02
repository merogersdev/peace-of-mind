import { createContext, useState, useMemo } from "react";

import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await axios.get("/users/details", {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });
    setUser(response.data.userDetails);
  };

  // Memoize the context
  const userProviderValue = useMemo(
    () => ({ user, setUser, getUser }),
    [user, setUser, getUser]
  );

  return (
    <UserContext.Provider value={userProviderValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
