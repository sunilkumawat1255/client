import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("AdminUserToken"); // Check for token in localStorage
  return token ? children : <Navigate to="/adminlogin" />; // Redirect to login if no token
};

export default PrivateRoute;
