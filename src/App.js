import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import FAQ from "./pages/FAQ";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Order from "./pages/Order";
import About from "./pages/About";
import Developers from "./pages/Dev";
import Support from "./pages/Support";
import History from "./pages/History";
import UserPage from "./pages/UserPage";
import UserForm from "./pages/UserForm";
import OrderDetail from "./pages/OrderDetail";
import ProductForm from "./pages/ProductForm";
import ProductPage from "./pages/ProductPage";
import TermsPrivacy from "./pages/TermsPrivacy";
import ProductShopList from "./pages/ProductShopList";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProtectedRoute from "./service/ProtectedRoute";

import { AuthProvider } from "./auth/AuthContext";

function App() {
  const initialOptions = {
    clientId:
      "AaKfNymjl48o2itp9lUil3FuP80HdjrFAd_yk6YQofIETcAPirvuYrwXRuVxW_nZXIJHCGTMFdpu5XGA",
    currency: "BRL",
  };

  return (
    <AuthProvider>
      <PayPalScriptProvider options={initialOptions}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/user/form" element={<UserForm />} />
            <Route
              path="/user"
              element={<ProtectedRoute element={<UserPage />} />}
            />

            <Route path="/cart" element={<Cart />} />

            <Route path="/product/form" element={<ProductForm />} />
            <Route path="/produto/:id" element={<ProductPage />} />

            <Route path="/order" element={<Order />} />
            <Route path="/order/:id" element={<OrderDetail />} />

            <Route
              path="/categoria/:categoryName"
              element={<ProductShopList />}
            />

            {/* Sobre  */}
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            <Route path="/devs" element={<Developers />} />

            {/* Suporte */}
            <Route path="/suporte" element={<Support />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/politica-de-privacidade" element={<TermsPrivacy />} />
            <Route path="/termos-de-uso" element={<TermsPrivacy />} />
          </Routes>
        </Router>
      </PayPalScriptProvider>
    </AuthProvider>
  );
}

export default App;
