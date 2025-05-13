import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("AdminUserToken");
  return token ? children : <Navigate to="/adminlogin" />;
};

export default PrivateRoute;
