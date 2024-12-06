import React, { useEffect, useState } from "react";

import "./ProductShopList.css";

import { useLocation } from "react-router-dom";

import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";

import Header from "../components/Header";
import Product from "../components/Product";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";

const ProductShopList = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const categoryFromUrl =
    decodeURIComponent(location.pathname.split("/categoria/")[1]) || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5047/api/Product");
        const productData = response.data;

        setProducts(productData);
        setFilteredProducts(productData);

        const uniqueCategories = [
          ...new Set(productData.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);

        if (categoryFromUrl) {
          setSelectedCategory(categoryFromUrl);
          const filtered = productData.filter(
            (product) => product.category === categoryFromUrl
          );
          setFilteredProducts(filtered);
        } else {
          setSelectedCategory("");
          setFilteredProducts(productData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFromUrl]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category) {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.target.value === "") {
      if (e.target.value === "") {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!selectedCategory || product.category === selectedCategory)
        );
        setFilteredProducts(filtered);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <HeaderNav />
      <Header />
      <div className="productShopList">
        <div className="sidebar">
          <h3>Categorias</h3>
          <ul>
            <li
              onClick={() => handleCategorySelect("")}
              className={selectedCategory === "" ? "active" : ""}
            >
              Todos os Produtos
            </li>
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={selectedCategory === category ? "active" : ""}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="content">
          <div className="searchContainer">
            <span className="searchIcon">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearch}
              className="searchInput"
            />
          </div>
          {loading ? (
            <p>Carregando produtos...</p>
          ) : filteredProducts.length > 0 ? (
            <div className="productGrid">
              {filteredProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductShopList;
