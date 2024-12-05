import React from "react";

import "./About.css";

import Header from "../components/Header";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <>
      <HeaderNav />
      <Header />
      <div className="about-page-container">
        <div className="about-content">
          <h1>Sobre a Equipe Nexus</h1>
          <p>
            O projeto <strong>Nexus</strong> nasceu como uma ideia inovadora na
            <strong> Escola de T.I.</strong> Desde o início, nossa equipe foi
            formada por desenvolvedores apaixonados por tecnologia e inovação,
            unindo esforços para criar uma solução que conecta clientes e
            produtos de forma eficiente e personalizada.
          </p>
          <p>
            Somos uma equipe dedicada, composta por profissionais que acreditam
            no poder da tecnologia para transformar experiências de consumo.
            Cada integrante do Nexus traz habilidades únicas, desde design
            criativo até o desenvolvimento backend robusto, garantindo que cada
            detalhe do projeto atenda às expectativas de nossos usuários.
          </p>
          <p>
            Nosso objetivo é entregar um e-commerce inteligente que não apenas
            facilite as compras online, mas que também aprenda e se adapte às
            necessidades de cada cliente, oferecendo um atendimento exclusivo e
            personalizado. Inspirados pela metodologia e suporte da Escola de
            T.I., seguimos aprendendo, crescendo e construindo um futuro onde a
            tecnologia seja acessível e impactante para todos.
          </p>
          <p>
            Juntos, estamos transformando uma visão em realidade. Seja bem-vindo
            ao mundo Nexus, onde a tecnologia e a inovação se encontram para
            criar algo único!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
