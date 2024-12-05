import React, { useState, useEffect } from "react";
import "./ProductForm.css";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import HeaderNav from "../components/HeaderNav";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productFromState = location.state?.product;

  const [product, setProduct] = useState({
    id: productFromState?.id || "",
    name: productFromState?.name || "",
    description: productFromState?.description || "",
    price: productFromState?.price || 0,
    category: productFromState?.category || "",
    image: productFromState?.imageUrl || "",
  });

  const [imagePreview, setImagePreview] = useState(product.image || "");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({ ...prev, image: file }));

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePriceInputChange = (e) => {
    const value = e.target.value;
    setProduct((prev) => ({ ...prev, price: value }));
  };

  const handleImageRemove = () => {
    setProduct((prev) => ({ ...prev, image: null }));
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", product.name);
    formData.append("Description", product.description);
    formData.append("Price", product.price);
    formData.append("Category", product.category);

    if (product.image) {
      formData.append("Image", product.image);
    }

    try {
      let response;
      if (product.id) {
        response = await axios.put(
          `http://localhost:5047/api/Product/${product.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Produto atualizado com sucesso!");
        navigate(`/produto/${product.id}`);
      } else {
        response = await axios.post(
          "http://localhost:5047/api/Product",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Produto criado com sucesso!");
        navigate(`/produto/${response.data.id}`);
      }
    } catch (error) {
      console.error("Erro ao processar produto:", error);
      alert("Erro ao processar produto.");
    }
  };

  return (
    <div>
      <HeaderNav />
      <Header />
      <div className="product-form-container">
        <form onSubmit={handleSubmit}>
          <h3>{product.id ? "Atualizar Produto" : "Criar Produto"}</h3>
          <input
            type="text"
            name="name"
            value={product.name}
            placeholder="Nome do Produto"
            className="product-input"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="description"
            value={product.description}
            placeholder="Descrição do Produto"
            className="product-input"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="price"
            value={product.price}
            placeholder="Preço"
            className="product-input"
            onChange={handlePriceInputChange}
            required
          />
          <input
            type="text"
            name="category"
            value={product.category}
            placeholder="Categoria"
            className="product-input"
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            className="product-input"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />

          {imagePreview && (
            <div className="image-preview-container">
              <img src={imagePreview} alt="Preview" className="image-preview" />
              <button
                type="button"
                className="delete-image-btn"
                onClick={handleImageRemove}
              >
                <DeleteIcon />
              </button>
            </div>
          )}

          <div className="product-container-button">
            <button type="submit" className="product-btn-form">
              {product.id ? "Atualizar Produto" : "Criar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
