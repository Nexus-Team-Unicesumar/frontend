import React from "react";

import "./FAQ.css";

import Header from "../components/Header";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";

const FAQPage = () => {
  const topics = [
    {
      title: "Segurança",
      questions: [
        "Como alterar sua senha?",
        "Como melhorar sua senha?",
        "O que fazer em caso de senha comprometida?",
      ],
    },
    {
      title: "Pedidos",
      questions: [
        "Como rastrear meu pedido?",
        "Posso cancelar um pedido?",
        "O que fazer se meu pedido não chegou?",
      ],
    },
    {
      title: "Pagamentos",
      questions: [
        "Quais métodos de pagamento são aceitos?",
        "Como funcionam os reembolsos?",
        "É seguro salvar meus dados de pagamento?",
      ],
    },
    {
      title: "Conta",
      questions: [
        "Como atualizar minhas informações de contato?",
        "Como excluir minha conta?",
        "Posso ter mais de uma conta?",
      ],
    },
  ];

  return (
    <>
      <HeaderNav />
      <Header />
      <div className="faq-page">
        <h1 className="faq-title">Perguntas Frequentes</h1>
        <p className="faq-subtitle">
          Encontre respostas rápidas para dúvidas organizadas por tópicos.
        </p>

        <div className="faq-grid">
          {topics.map((topic, index) => (
            <div key={index} className="faq-card">
              <h2 className="faq-topic-title">{topic.title}</h2>
              <ul className="faq-question-list">
                {topic.questions.map((question, qIndex) => (
                  <li key={qIndex} className="faq-question">
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQPage;
