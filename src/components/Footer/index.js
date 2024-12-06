import React from "react";

import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Sobre</h4>
          <ul>
            <li>
              <a href="/about">Quem somos</a>
            </li>
            <li>
              <a href="/history">Nossa história</a>
            </li>
            <li>
              <a href="/devs">Desenvolvedores</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Ajuda</h4>
          <ul>
            <li>
              <a href="/suporte">Suporte</a>
            </li>
            <li>
              <a href="/politica-de-privacidade">Política de Privacidade</a>
            </li>
            <li>
              <a href="/termos-de-uso">Termos de Uso</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Redes sociais</h4>
          <ul>
            <li>
              <a
                href="https://github.com/Rafael-Beraldo"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contate-nos</h4>
          <ul>
            <li>
              <a href="mailto:raffatemplate@gmail.com">Email</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Nexus. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
