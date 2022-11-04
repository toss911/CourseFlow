import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    user: null,
  });

  const navigate = useNavigate();

  const register = async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:4000/auth/register",
        data
      );
      if (/success/g.test(result.data.message)) {
        alert(`${result.data.message}`);
        navigate("/login");
      } else {
        return result.data.message;
      }
    } catch (error) {
      alert(`ERROR: Please try again later`);
    }
  };

  const login = async (data) => {
    try {
      const result = await axios.post("http://localhost:4000/auth/login", data);
      if (result.data.token) {
        const token = result.data.token;
        localStorage.setItem("token", token);
        const userDataFromToken = jwtDecode(token);
        setState({ user: userDataFromToken });
        navigate("/");
      } else {
        return result.data.message;
      }
    } catch (error) {
      alert(`ERROR: Please try again later`);
    }
  };
  // localStorage.removeItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    setState({ user: null });
    navigate("/");
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  // if (isAuthenticated && !state.user) {
  //   const token = localStorage.getItem("token");
  //   const userDataFromToken = jwtDecode(token);
  //   setState({ user: userDataFromToken });
  // }

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
