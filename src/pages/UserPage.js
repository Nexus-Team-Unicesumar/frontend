import React, { useState, useEffect, useContext } from "react";

import "./UserPage.css";

import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import HeaderNav from "../components/HeaderNav";
import userImage from "../assets/user.jpg";
import Footer from "../components/Footer";

import { AuthContext } from "../auth/AuthContext";

const UserPage = () => {
  const navigate = useNavigate();
  const { user, setUser, token } = useContext(AuthContext);

  const [id, setId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    number: "",
    city: "",
    phone: "",
    email: "",
    imageUrl: "",
    rating: 4.5,
  });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Carregar dados do usuário
    fetch("http://localhost:5047/api/User/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setId(data.id);
        setUser(data);
        setFormData(data);
      })
      .catch((error) =>
        console.error("Erro ao buscar dados do usuário:", error)
      );

    // Carregar pedidos do usuário
    if (user && user.id) {
      const fetchOrders = async () => {
        try {
          const response = await fetch(
            `http://localhost:5047/api/Order/user/${user.id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Erro ao buscar pedidos.");
          }

          const data = await response.json();
          const updatedOrders = data.map((order) => {
            const totalAmount = order.items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );
            return { ...order, totalAmount };
          });

          setOrders(updatedOrders);
        } catch (error) {
          setErrorOrders(error.message);
        } finally {
          setLoadingOrders(false);
        }
      };

      fetchOrders();
    }
  }, [navigate, setUser, user, token]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      street: !formData.street,
      number: !formData.number,
      city: !formData.city,
      phone: !formData.phone,
      email: !formData.email,
    };

    if (Object.values(validationErrors).includes(true)) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token não encontrado! Por favor, faça login novamente.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5047/api/User/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          password: "123",
          firstName: formData.firstName,
          lastName: formData.lastName,
          street: formData.street,
          number: formData.number,
          city: formData.city,
          imageUrl: "",
          phone: formData.phone,
        }),
      });

      if (response.status === 204) {
        console.log("Usuário atualizado com sucesso");
      } else if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("Erro na requisição");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }

    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star full-star">
          ★
        </span>
      );
    }

    if (halfStar) {
      stars.push(
        <span key="half" className="star half-star">
          ★
        </span>
      );
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <span key={i + 5} className="star empty-star">
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <>
      <HeaderNav />
      <Header />
      <div className="user-page-columns">
        <div className="user-info-column">
          <img
            src={formData.imageUrl || userImage}
            alt="Foto do Usuário"
            className="user-avatar"
          />
          <h2>
            {formData.firstName} {formData.lastName}
          </h2>
          <p className="user-email">{formData.email}</p>
          <div className="user-rating">{renderStars(formData.rating)}</div>
          <a className="user-logout" onClick={handleLogout}>
            Desconectar
          </a>
        </div>
        <div className="user-details-column">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="user-edit-form">
              <label>
                Nome:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                />
              </label>
              <label>
                Sobrenome:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                />
              </label>
              <label>
                Telefone:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                />
              </label>
              <label>
                Rua:
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="input-field"
                />
              </label>
              <label>
                Número:
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="input-field"
                />
              </label>
              <label>
                Cidade:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input-field"
                />
              </label>
              <button type="submit" className="btn-save">
                Salvar
              </button>
              <span>{"  "}</span>
              <button onClick={handleEditToggle} className="btn-logout">
                Cancelar
              </button>
            </form>
          ) : (
            <>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Telefone:</strong> {formData.phone}
              </p>
              <p>
                <strong>Endereço:</strong> {formData.street}, {formData.number}{" "}
                - {formData.city}
              </p>
              <button
                type="submit"
                onClick={handleEditToggle}
                className="btn-edit"
              >
                Editar
              </button>

              {/* Exibir pedidos */}
              <div className="user-details">
                <div className="user-orders">
                  <h3>Pedidos Recentes</h3>
                  <div className="order-list">
                    {orders.slice(0, 2).map((order) => (
                      <div className="order-card" key={order.id}>
                        <div className="order-header">
                          <h4>Pedido #{order.id.slice(0, 10) + "..."}</h4>
                          <span
                            className={`status ${order.status.toLowerCase()}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="order-details">
                          <p>
                            <strong>Data:</strong>{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Total:</strong> R$
                            {order.totalAmount.toFixed(2)}
                          </p>
                        </div>
                        <button
                          className="view-details-btn"
                          style={{ backgroundColor: "#3a3d46" }}
                          onClick={() => navigate(`/order/${order.id}`)}
                        >
                          Detalhes
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          {/*  */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserPage;
