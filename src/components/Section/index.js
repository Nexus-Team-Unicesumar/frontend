import React from "react";

import "./style.css";

import { useNavigate } from "react-router-dom";

const mapCategoriesToPortuguese = (categories) => {
  return categories.map(({ apiCategory, displayName }) => ({
    apiCategory,
    displayName,
  }));
};

const Section = () => {
  const navigate = useNavigate();

  const categories = [
    { apiCategory: "Celulares", displayName: "Celulares" },
    { apiCategory: "Acessorios", displayName: "Acessórios" },
    { apiCategory: "Roupas", displayName: "Roupas" },
    { apiCategory: "Eletrodomesticos", displayName: "Eletrodomésticos" },
    { apiCategory: "Relogios", displayName: "Relógios" },
    { apiCategory: "Eletronicos", displayName: "Eletrônicos" },
    { apiCategory: "Saude e Beleza", displayName: "Saúde e Beleza" },
    { apiCategory: "Casa e Jardim", displayName: "Casa e Jardim" },
  ];

  const mappedCategories = mapCategoriesToPortuguese(categories);

  const handleCategoryClick = (apiCategory) => {
    navigate(`/categoria/${apiCategory}`);
  };

  return (
    <section className="section">
      <div className="category-wraper">
        {mappedCategories.map(({ apiCategory, displayName }) => (
          <div
            key={apiCategory}
            className="category"
            onClick={() => handleCategoryClick(apiCategory)}
          >
            <p>{displayName}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section;
