import { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bingoApi from "../service/bingoApi";

type userType = {
  email: string;
  password: string;
};

type AuthContextProps = {
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
  storeToken: (token: string) => void;
  removeToken: () => void;
  authenticateUser: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextProps | null>(null);
function AuthContextWrapper({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // call authenticate function when loading page
  useEffect(() => {
    authenticateUser();
  }, []);

  const storeToken = (token: string) => localStorage.setItem("token", token);
  const removeToken = () => localStorage.removeItem("token");

  const authenticateUser = async () => {
    try {
      // get token from local storage, token exists if user is logged in
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
        return;
      }
      // if token exists, send request with the bearer token to verify its validity
      const response = await bingoApi.get("/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // request should send a response with the user data if successful
      setUser(response.data);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };

  // function to log out

  const navigate = useNavigate();
  const logOut = () => {
    removeToken();
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        storeToken,
        removeToken,
        authenticateUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextWrapper;
