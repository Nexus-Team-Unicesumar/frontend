import React, { useEffect, useState } from "react";

import commonStyles from "../styles/commonStyles.module.css";

import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Carousel from "../components/Carousel";
import HeaderNav from "../components/HeaderNav";
import ChatWidget from "../components/ChatWidget";
import BannerCarousel from "../components/BannerCarousel";
import CategorySection from "../components/CategorySection";

import { useNavigate } from "react-router-dom";

import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";

import people1 from "../assets/people1.png";
import people2 from "../assets/people2.png";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const bannersInfo = [banner1, banner2];
  const bannersBlackFriday = [banner3, banner4, banner5];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5047/api/Product");
        setProducts(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const clearCategory = () => {
    setSelectedCategory("");
  };

  const filteredProducts = products.filter(
    (product) =>
      (searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || product.category === selectedCategory)
  );

  const feedbacks = [
    {
      id: 1,
      name: "Rafael Beraldo",
      comment: "Ótima qualidade, superou minhas expectativas! Recomendo muito!",
      rating: 5,
    },
    {
      id: 2,
      name: "Thomas",
      comment: "Entrega rápida e produto bem embalado. Excelente experiência.",
      rating: 4,
    },
    {
      id: 3,
      name: "Diego Akira",
      comment: "Preço justo e atendimento incrível! Estou muito satisfeito.",
      rating: 5,
    },
    {
      id: 4,
      name: "Kayque Ruiz",
      comment: "Muito bom, mas poderia ter mais opções de cores.",
      rating: 3,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} style={{ color: index < rating ? "#FFD700" : "#ccc" }}>
        ★
      </span>
    ));
  };

  return (
    <div>
      <HeaderNav />
      <Header isMain onSearch={handleSearch} />
      <Section onCategorySelect={handleCategorySelect} />

      <div className={commonStyles.center}>
        <div className={commonStyles.width_70}>
          <BannerCarousel selectedBanners={bannersInfo} />
          <CategorySection onCategorySelect={handleCategorySelect} />

          {selectedCategory && (
            <div className={commonStyles.categorySelected}>
              <p>
                Categoria selecionada: <strong>{selectedCategory}</strong>
              </p>
              <button
                onClick={clearCategory}
                className={commonStyles.clearButton}
              >
                Limpar categoria
              </button>
            </div>
          )}

          <div
            className="info-section"
            style={{ textAlign: "center", marginTop: "15vh" }}
          >
            <div
              className="info-description"
              style={{
                width: "100%",
                backgroundColor: "#3a3d46",
                borderRadius: 20,
                display: "flex",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 1)",
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "5%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: "#FFFFFF", fontSize: "90%" }}>
                  A Comunidade Que Faz Acontecer
                </h2>
                <p style={{ color: "#F2F2F2", fontSize: "80%" }}>
                  Conheça quem já faz parte do nosso universo! Cada rosto aqui
                  representa clientes satisfeitos que confiam e compartilham sua
                  experiência com a gente. Junte-se a essa comunidade incrível e
                  escreva sua própria história!
                </p>
                <div style={{ marginTop: 15 }}>
                  <a
                    style={{
                      backgroundColor: "#ecebeb",
                      padding: "2% 5%",
                      borderRadius: 50,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                  >
                    Sobre nós
                  </a>
                </div>
              </div>
              <div style={{ flex: 1, marginTop: 15 }}>
                <img src={people1} style={{ width: "50%", height: "100%" }} />
                <img src={people2} style={{ width: "50%", height: "100%" }} />
              </div>
            </div>
          </div>

          {loading ? (
            <p>Carregando produtos...</p>
          ) : filteredProducts.length > 0 ? (
            <>
              {searchTerm === "" && !selectedCategory && (
                <>
                  <h1 style={{ marginTop: 50, fontSize: 14 }}>
                    Produtos Recomendados :
                  </h1>
                  <Carousel products={filteredProducts} />
                </>
              )}
            </>
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </div>
      </div>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "1000px",
          margin: "20px auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "24px",
            color: "#333",
          }}
        >
          O que nossos clientes dizem
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "18px",
                  color: "#555",
                }}
              >
                {feedback.name}
              </h3>
              <p
                style={{
                  margin: "0 0 10px",
                  color: "#777",
                }}
              >
                {feedback.comment}
              </p>
              <div
                style={{
                  fontSize: "20px",
                }}
              >
                {renderStars(feedback.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      <ChatWidget />
    </div>
  );
};

export default HomePage;
