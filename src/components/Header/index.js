import React, { useState, useContext } from "react";

import "./style.css";
import commonStyles from "../../styles/commonStyles.module.css";

import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Input from "../Input";
import logo from "../../assets/logo.png";

import { AuthContext } from "../../auth/AuthContext";

const Header = ({ onSearch, isMain }) => {
  const navigate = useNavigate();

  return (
    <div>
      {isMain ? (
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
      ) : (
        <div className="header">
          <div className="container-header">
            <ArrowBackIcon
              fontSize="small"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
            <img
              src={logo}
              alt="Logo"
              style={{
                marginLeft: 20,
                width: 200,
                height: 60,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
