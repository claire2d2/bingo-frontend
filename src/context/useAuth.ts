import { useContext } from "react";
import { AuthContext } from "./AuthContextWrapper";
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};

export default useAuth;
