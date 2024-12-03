import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { ShoppingCart, Person, Add } from "@mui/icons-material";
import Badge from "@mui/material/Badge";

import { AuthContext } from "../../auth/AuthContext";

import "./style.css";

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(0);
  const { user } = useContext(AuthContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleProfileClick = () => {
    setIsMenuVisible((prevState) => !prevState);
  };

  return (
    <header className="header-nav">
      <div className="header-left">
        {user ? (
          <p style={{ fontSize: 12 }}>Olá {user.firstName}</p>
        ) : (
          <div style={{ display: "flex", fontSize: 12 }}>
            <a className="header-link" onClick={() => navigate("/user/form")}>
              Cadastrar-se
            </a>
            <p className="margin_3"> Ou </p>
            <a className="header-link" onClick={() => navigate("/login")}>
              Entrar
            </a>
          </div>
        )}
        <a
          className="header-text margin_left"
          onClick={() => navigate("/about")}
        >
          Ajuda e Contato
        </a>
      </div>

      <div className="header-right">
        <a className="header-text" onClick={() => navigate("/product/form")}>
          Vender
        </a>
        <a className="header-text" onClick={handleProfileClick}>
          Meu Perfil ▿
        </a>
        <Badge
          badgeContent={cartItems}
          color="secondary"
          style={{ marginLeft: 15, marginRight: 25 }}
        >
          <ShoppingCart
            style={{ width: 25, height: 25, cursor: "pointer", color: "black" }}
            onClick={handleCartClick}
          />
        </Badge>
        {isMenuVisible && (
          <div className="submenu">
            <a
              style={{ cursor: "pointer", color: "#FFF" }}
              onClick={() => navigate("/user")}
            >
              Meu Perfil
            </a>
            <a
              style={{ cursor: "pointer", color: "#FFF" }}
              onClick={() => navigate("/order")}
            >
              Meus Pedidos
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
