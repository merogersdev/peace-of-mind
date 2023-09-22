import { createContext, useState } from "react";

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

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
