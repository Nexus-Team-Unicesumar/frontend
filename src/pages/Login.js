import React, { useState, useContext } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../auth/AuthContext";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5047/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao realizar login. Verifique suas credenciais.");
      }

      const data = await response.json();
      const { token } = data;

      localStorage.setItem("token", token);

      setIsAuthenticated(true);
      await fetchUserData(token);
      navigate("/user");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:5047/api/User/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(
          responseData.message || "Erro ao buscar os dados do usuário."
        );
      }
      setUser(responseData);
    } catch (error) {
      setError(error.message);
    }
  };

  const createUser = () => {
    navigate("/user/form");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            value={email}
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            maxLength={100}
            required
          />
          <input
            type="password"
            value={password}
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>
        <div className="login-links">
          <button type="button" onClick={createUser} className="link-button">
            Criar Usuário
          </button>
          <button type="button" className="link-button">
            Esqueci a Senha
          </button>
        </div>

        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
