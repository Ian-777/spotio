import {
  createContext,
  useState,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const userData = await AsyncStorage.getItem("user");

      if (token) {
        setUserToken(token);
      }

      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const login = async (token, userData) => {
    try {
      await AsyncStorage.setItem("token", token);

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setUserToken(token);

      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");

      await AsyncStorage.removeItem("user");

      setUserToken(null);

      setUser(null);
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
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};