import { NavLink, useNavigate, useRouteError } from "react-router-dom";
import "./error.css";

export const ErrorPage = () => {
  const err = useRouteError();
  const navigate=useNavigate();

  const handleBackButton=()=>{
    navigate(-1);
  }

  return (
    <div className="container">
      <div className="main-body-error">
      <h2 className="error-title">Oops! Something went wrong.</h2>
      <p className="error-message">Error: {err.error.message}</p>
      <p className="error-status">Status: {err.status}</p>
      <NavLink to="/" className="error-link" onClick={handleBackButton}>Back</NavLink>
      <NavLink to="/" className="error-link">Go to Home</NavLink>
      </div>
    </div>
  );
};
