import React from "react";

import "./Dev.css";

import Header from "../components/Header";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";

import Rafael from "../assets/user.jpg";
import Thomas from "../assets/thomas.jpg";
import Kayque from "../assets/kayque.jpg";
import Diego from "../assets/diego.jpg";

const DevelopersPage = () => {
  const developers = [
    {
      name: "Rafael Beraldo",
      image: Rafael,
      description:
        "Rafael é especialista em front-end, com paixão por criar interfaces intuitivas e designs modernos. Responsável por garantir a usabilidade do e-commerce.",
    },
    {
      name: "Kayque Ruiz",
      image: Kayque,
      description:
        "Kayque é responsável pela arquitetura de dados e pela implementação da inteligência artificial do projeto. Sempre inovando com soluções tecnológicas avançadas.",
    },
    {
      name: "Thomas Eduardo",
      image: Thomas,
      description:
        "Thomas é desenvolvedora back-end, dedicada à construção de APIs robustas e integração de serviços, garantindo que tudo funcione perfeitamente no e-commerce.",
    },
    {
      name: "Diego Akira",
      image: Diego,
      description:
        "Diego é responsável pela arquitetura de dados e pela implementação da inteligência artificial do projeto. Sempre inovando com soluções tecnológicas avançadas.",
    },
  ];

  return (
    <>
      <HeaderNav />
      <Header />
      <div className="developers-container">
        <h1>Nossa Equipe de Desenvolvedores</h1>
        <div className="developers-list">
          {developers.map((developer, index) => (
            <div
              key={index}
              className={`developer ${
                index % 2 === 0 ? "developer-left" : "developer-right"
              }`}
            >
              <img
                src={developer.image}
                alt={developer.name}
                className="developer-image"
              />
              <div className="developer-description">
                <h2>{developer.name}</h2>
                <p>{developer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DevelopersPage;
