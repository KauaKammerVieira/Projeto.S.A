import React from "react";
import "./QuestionOption.css";

const QuestionOption = ({ texto, selecionada, onClick }) => (
  <button
    onClick={onClick}
    className={`question-option ${selecionada ? "question-option--selecionada" : ""}`}
  >
    <span className="question-option__circulo" />
    {texto}
  </button>
);

export default QuestionOption;