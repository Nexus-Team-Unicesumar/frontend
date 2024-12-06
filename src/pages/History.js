import React from "react";

import "./History.css";

import Header from "../components/Header";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";

const HistoryPage = () => {
  return (
    <>
      <HeaderNav />
      <Header />
      <div className="history-container">
        <h1>Nossa História</h1>
        <p>
          Tudo começou na <strong>Unicesumar</strong>, com um grupo de
          estudantes determinados a criar algo significativo em seu último
          semestre na faculdade. Durante o segundo semestre de 2024, surgiu a
          ideia de desenvolver um e-commerce inovador, mas com uma abordagem
          tecnológica única.
        </p>
        <p>
          Decidimos integrar uma <strong>inteligência artificial</strong> ao
          projeto, treinada com base nos produtos do e-commerce, para oferecer
          uma experiência personalizada aos usuários. Essa IA seria capaz de
          sugerir itens, otimizar buscas e ajudar na gestão do estoque, trazendo
          um diferencial competitivo ao mercado.
        </p>
        <p>
          O projeto, que começou como um desafio acadêmico, tornou-se uma
          paixão. Cada integrante do grupo contribuiu com suas habilidades,
          desde o design do front-end até a integração de tecnologias no
          back-end, resultando em um sistema completo, funcional e pronto para
          crescer.
        </p>
        <p>
          Nosso objetivo é continuar evoluindo, aplicando os conhecimentos
          adquiridos ao longo da jornada acadêmica e aprendendo com os desafios
          do mercado real.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default HistoryPage;
