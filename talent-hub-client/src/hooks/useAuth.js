import { useContext } from "react";
import { UserContext } from "../context/AuthProviders";

const useAuth = () => {
  const auth = useContext(UserContext);
  return auth;
};

export default useAuth;
