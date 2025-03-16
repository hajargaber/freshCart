import { createContext, useState, useEffect } from "react";

export const tokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(() => {
 
    return localStorage.getItem("token") || null;
  });

 
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {children}
    </tokenContext.Provider>
  );
}