import {
  createContext,
  useState,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        setUserToken(token);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const login = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);

      setUserToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");

      setUserToken(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        userToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};