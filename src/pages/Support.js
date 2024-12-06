import React from "react";

import "./Support.css";

import Header from "../components/Header";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";

const SupportPage = () => {
  return (
    <>
      <HeaderNav />
      <Header />
      <div className="support-page">
        <div className="hero-section">
          <h1 className="support-title">Precisa de Ajuda?</h1>
          <p className="support-subtitle">
            Estamos aqui para garantir que você tenha a melhor experiência.
          </p>
        </div>

        <div className="faq-section">
          <h2 className="section-title">Perguntas Frequentes</h2>
          <div className="faq-list">
            {[
              {
                question: "Como faço para alterar minha senha?",
                answer:
                  "Acesse sua página de perfil e clique em 'Alterar Senha'. Insira sua senha atual e a nova senha para concluir a alteração.",
              },
              {
                question: "Como rastrear meu pedido?",
                answer:
                  "Na página de histórico de pedidos, clique em 'Detalhes do Pedido'. Você verá as informações de rastreamento.",
              },
              {
                question: "Posso cancelar um pedido?",
                answer:
                  "Sim, desde que o pedido ainda não tenha sido processado. Entre em contato com o suporte para assistência.",
              },
            ].map((faq, index) => (
              <div className="faq-item" key={index}>
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-section">
          <h2 className="section-title">Fale Conosco</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input type="text" id="name" placeholder="Seu nome" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Seu email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                placeholder="Como podemos ajudar você?"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Enviar
            </button>
          </form>
        </div>

        <div className="contact-info-section">
          <h2 className="section-title">Outros Meios de Contato</h2>
          <div className="contact-info">
            <p>
              Email: <a href="mailto:suporte@nexus.com">suporte@nexus.com</a>
            </p>
            <p>
              Telefone: <a href="tel:+554412345678">+55 (44) 1234-5678</a>
            </p>
            <p>Horário de Atendimento: Segunda a Sexta, das 8h às 18h</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SupportPage;
