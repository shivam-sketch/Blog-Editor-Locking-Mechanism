import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useCookies } from "./useCookies";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("blogs_hub", null);
  const [cookie, setCookie] = useCookies("blogs_hub", null);
  // const [cartData, setCartData] = useState({});
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    setCookie(data.token);
    navigate("/", { replace: true });
  };

  const logout = () => {
    setUser(null);
    setCookie(null);
    navigate("/login", { replace: true });
  };

  // useEffect(() => {
  //   if (!user && !cookie) {
  //     logout();
  //   }
  // }, [user]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      // cartData,
      // setCartData,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
