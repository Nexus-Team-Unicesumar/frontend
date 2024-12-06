import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./service/ProtectedRoute";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import UserForm from "./pages/UserForm";
import ProductForm from "./pages/ProductForm";
import Order from "./pages/Order";
import OrderDetail from "./pages/OrderDetail";
import About from "./pages/About";
import History from "./pages/History";
import Developers from "./pages/Dev";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";
import TermsPrivacy from "./pages/TermsPrivacy";

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
            <Route path="/cart" element={<Cart />} />
            <Route path="/user/form" element={<UserForm />} />
            <Route path="/product/form" element={<ProductForm />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/:id" element={<OrderDetail />} />

            {/* Sobre  */}
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            <Route path="/devs" element={<Developers />} />

            {/* Suporte */}
            <Route path="/suporte" element={<Support />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/politica-de-privacidade" element={<TermsPrivacy />} />
            <Route path="/termos-de-uso" element={<TermsPrivacy />} />

            <Route
              path="/user"
              element={<ProtectedRoute element={<UserPage />} />}
            />

            <Route path="/produto/:id" element={<ProductPage />} />
          </Routes>
        </Router>
      </PayPalScriptProvider>
    </AuthProvider>
  );
}

export default App;
