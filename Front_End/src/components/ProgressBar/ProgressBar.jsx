import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ atual, total }) => (
  <div className="progress-bar-wrapper">
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: `${(atual / total) * 100}%` }}
      />
    </div>
    <span className="progress-bar__label">{atual}/{total}</span>
  </div>
);

export default ProgressBar;