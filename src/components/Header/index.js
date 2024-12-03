import React, { useState, useContext } from "react";

import "./style.css";
import commonStyles from "../../styles/commonStyles.module.css";

import { useNavigate } from "react-router-dom";
import { ShoppingCart, Person, Add } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../auth/AuthContext";

import Input from "../Input";

const Header = ({ onSearch }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className={commonStyles.container}>
        <div className="small-column">
          <div className="logo">
            <img src={logo} style={{ width: 200, height: 60 }} />
          </div>
        </div>
        <div className="big-column">
          <Input placeholder="Pesquisar..." onSearch={onSearch} />
        </div>
        <div className="small-column"></div>
      </div>
    </header>
  );
};

export default Header;
