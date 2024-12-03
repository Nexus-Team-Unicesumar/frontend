import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

import "./Cart.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "../components/Header";
import HeaderNav from "../components/HeaderNav";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { AuthContext } from "../auth/AuthContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const initialOptions = {
    clientId:
      "AaKfNymjl48o2itp9lUil3FuP80HdjrFAd_yk6YQofIETcAPirvuYrwXRuVxW_nZXIJHCGTMFdpu5XGA",
    currency: "BRL",
  };

  useEffect(() => {
    const loadCartItems = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    };

    loadCartItems();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    };

    calculateTotal();
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < cartItems.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const createOrderInBackend = async (paymentDetails) => {
    try {
      const items = cartItems.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const orderData = {
        userId: user.id,
        items,
        createdAt: new Date().toISOString(),
        status: "APROVADO",
      };

      if (user && user.id) {
        const response = await fetch("http://localhost:5047/api/Order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new Error("Erro ao criar o pedido.");
        }

        alert("Transação concluída com sucesso! Pedido registrado.");
        localStorage.removeItem("cart");
        navigate("/order");
      }
    } catch (error) {
      console.error("Erro ao criar pedido:", error.message);
      alert("Erro ao criar o pedido. Tente novamente.");
    }
  };

  const getCurrentPageItems = () => {
    const startIndex = currentPage * itemsPerPage;
    return cartItems.slice(startIndex, startIndex + itemsPerPage);
  };

  if (cartItems.length === 0)
    return (
      <>
        <HeaderNav />
        <Header />
        <div className="container">
          <div className="nexusContainer">
            <p className="nexusIcon">Nexus</p>
          </div>
          <h2 className="title">Coloque produtos no carrinho!</h2>
        </div>
      </>
    );

  return (
    <PayPalScriptProvider options={initialOptions}>
      <HeaderNav />
      <Header />
      <div className="cartPage">
        <div className="cartContainer">
          <div className="cartItemsList">
            {getCurrentPageItems().map((item) => (
              <div key={item.id} className="cartItem">
                <div className="cartItemImage">
                  <img
                    src={`http://localhost:5047${item.imageUrl}`}
                    alt={item.name}
                    className="productImage"
                  />
                </div>
                <div className="cartItemDetails">
                  <h3>{item.name}</h3>
                  <p className="description">{item.description}</p>
                  <div className="cartItemPrice">
                    <span className="price">R${item.price.toFixed(2)}</span>
                    <div className="quantityContainer">
                      <label>Quantidade:</label>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => {
                          const updatedCart = cartItems.map((cartItem) =>
                            cartItem.id === item.id
                              ? {
                                  ...cartItem,
                                  quantity: Number(e.target.value),
                                }
                              : cartItem
                          );
                          setCartItems(updatedCart);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(updatedCart)
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="removeItem">
                  <DeleteIcon onClick={() => handleRemoveItem(item.id)} />
                </div>
              </div>
            ))}
          </div>

          <div className="paginationControls">
            <button
              className="paginationButton"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              <ArrowBackIcon />
            </button>
            <button
              className="paginationButton"
              onClick={handleNextPage}
              disabled={(currentPage + 1) * itemsPerPage >= cartItems.length}
            >
              <ArrowForwardIcon />
            </button>
          </div>

          <div className="totalPriceSection">
            <div className="totalPrice">
              <p>Total: R${totalPrice.toFixed(2)}</p>
            </div>

            <div className="checkoutSection">
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalPrice.toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    createOrderInBackend(details);
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default CartPage;
