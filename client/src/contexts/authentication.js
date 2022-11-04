import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    user: null,
  });

  const navigate = useNavigate();

  const register = async (data) => {
    try {
      await axios.post("http://localhost:4000/auth/register", data);
      alert("Account has been successfully registered!");
      // ลอง log ผลลัพธ์จาก POST ออกมาดูว่าถ้าเป็นกรณีอีเมลซ้ำ มันจะขึ้น successfully ไหม
      navigate("/login");
    } catch (error) {
      alert(error.response);
    }
  };

  const login = async (data) => {
    try {
      const result = await axios.post("http://localhost:4000/auth/login", data);
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setState({ user: userDataFromToken });
      navigate("/login");
    } catch (error) {
      alert(`Invalid Email or Password`);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ user: null });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, register }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
