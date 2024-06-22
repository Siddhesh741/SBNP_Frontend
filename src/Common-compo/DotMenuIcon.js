import React from "react";
import "./DotMenuIcon.css";

const DotMenuIcon = ({ isOpen, onClick }) => {
  return (
    <div className="dot-menu-container" onClick={onClick}>
      <div className={`dot-menu ${isOpen ? "open" : ""}`}>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default DotMenuIcon;
