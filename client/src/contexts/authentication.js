import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [contextState, setContextState] = useState({
    isLoading: false,
    isError: false,
    user: null,
    previousUrl: null,
  });

  const navigate = useNavigate();

  const register = async (data) => {
    try {
      let copiedData = Object.assign({}, data);
      // if education data is empty => turn it from empty string to null
      if (!copiedData.education) {
        copiedData.education = null;
      }
      const result = await axios.post(
        "http://localhost:4000/auth/register",
        copiedData
      );
      if (/success/g.test(result.data.message)) {
        return true;
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
        setContextState({ ...contextState, user: userDataFromToken });
        if (contextState.previousUrl) {
          navigate(contextState.previousUrl);
        } else {
          navigate("/");
        }
      } else {
        return result.data.message;
      }
      console.log("result.data.token: ", result.data.token);
    } catch (error) {
      alert(`ERROR: Please try again later`);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setContextState({ ...contextState, user: null });
    navigate("/");
  };

  const logoutAdmin = () => {
    localStorage.removeItem("token");
    setContextState({ ...contextState, user: null });
    navigate("/admin");
  };
  
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (isAuthenticated && !contextState.user) {
    const token = localStorage.getItem("token");
    const userDataFromToken = jwtDecode(token);
    setContextState({ ...contextState, user: userDataFromToken });
  }

  return (
    <AuthContext.Provider
      value={{
        contextState,
        setContextState,
        login,
        logout,
        register,
        isAuthenticated,
        logoutAdmin
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
