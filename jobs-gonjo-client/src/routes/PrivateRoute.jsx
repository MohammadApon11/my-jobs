import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/AuthProviders";
import Loader from "../components/shared/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
