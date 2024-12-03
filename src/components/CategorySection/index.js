import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

import c1 from "../../assets/c1.png";
import c2 from "../../assets/c2.png";
import c3 from "../../assets/c3.png";
import c4 from "../../assets/c4.png";
import c5 from "../../assets/c5.png";

const categories = [
  { id: 1, name: "Eletrônicos", imageUrl: c1 },
  { id: 2, name: "Roupas", imageUrl: c2 },
  { id: 3, name: "Móveis", imageUrl: c3 },
  { id: 4, name: "Beleza", imageUrl: c4 },
  { id: 5, name: "Alimentos", imageUrl: c5 },
];

const CategorySection = ({ onCategorySelect }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    onCategorySelect?.(categoryName);
    navigate(`/categoria/${categoryName.toLowerCase()}`);
  };

  return (
    <div className="categorySection">
      <h2>Escolha uma categoria</h2>
      <div className="categoryList">
        {categories.map((category) => (
          <div
            key={category.id}
            className="categoryItem"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div
              className="categoryCircle"
              style={{
                backgroundImage: `url(${category.imageUrl})`,
              }}
            />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
