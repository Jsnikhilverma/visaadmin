import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const expertToken = Cookies.get("expertToken");

  useEffect(() => {
    if (!token && !expertToken) {
      navigate("/login");
    }
  }, [token, expertToken, navigate]);

  const isValid = token || expertToken;

  return isValid ? children : null;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
