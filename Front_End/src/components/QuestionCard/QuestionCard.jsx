import React from "react";
import "./QuestionCard.css";
import QuestionOption from "../QuestionOption/QuestionOption.jsx";

const QuestionCard = ({ pergunta, nivel, alternativas, selecionada, onSelecionar }) => (
  <div className="question-card">
    <div className="question-card__header">
      <h2 className="question-card__pergunta">{pergunta}</h2>
      <span className="question-card__nivel">{nivel}</span>
    </div>
    <div className="question-card__opcoes">
      {alternativas.map((alt, i) => (
        <QuestionOption
          key={i}
          texto={alt}
          selecionada={selecionada === i}
          onClick={() => onSelecionar(i)}
        />
      ))}
    </div>
  </div>
);

export default QuestionCard;