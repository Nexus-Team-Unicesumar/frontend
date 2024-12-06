import React from "react";
import "./TermsPrivacy.css";
import Header from "../components/Header";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";

const TermsPrivacyPage = () => {
  return (
    <>
      <HeaderNav />
      <Header />
      <div className="terms-privacy-page">
        <h1 className="page-title">
          Termos de Serviço & Política de Privacidade
        </h1>
        <p className="page-description">
          Abaixo estão descritos os termos que regem o uso de nossos serviços e
          como protegemos seus dados.
        </p>

        <div className="internal-nav">
          <a href="#terms-of-service" className="nav-link">
            Termos de Serviço
          </a>
          <a href="#privacy-policy" className="nav-link">
            Política de Privacidade
          </a>
        </div>

        <div id="terms-of-service" className="content-section">
          <h2>Termos de Serviço</h2>
          <p>
            Ao acessar ou usar nossos serviços, você aceita e concorda em seguir
            as condições abaixo:
          </p>
          <ul>
            <li>
              Usar os serviços apenas para fins legais e de acordo com a
              legislação aplicável.
            </li>
            <li>
              Não compartilhar informações falsas ou enganosas ao criar ou
              acessar sua conta.
            </li>
            <li>
              Reservamo-nos o direito de modificar ou encerrar os serviços a
              qualquer momento.
            </li>
            <li>
              As violações aos termos podem resultar na suspensão de sua conta.
            </li>
          </ul>
        </div>

        <div id="privacy-policy" className="content-section">
          <h2>Política de Privacidade</h2>
          <p>
            Garantimos transparência no tratamento de seus dados pessoais. Aqui
            está como os utilizamos:
          </p>
          <ul>
            <li>
              Coletamos dados como nome, email e endereço para melhorar sua
              experiência.
            </li>
            <li>
              Suas informações não são compartilhadas com terceiros sem o seu
              consentimento.
            </li>
            <li>
              Você pode solicitar a exclusão ou alteração de seus dados a
              qualquer momento.
            </li>
            <li>
              Cookies são usados apenas para personalização e métricas internas.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsPrivacyPage;
