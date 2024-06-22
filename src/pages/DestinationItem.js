// DestinationItem.js  which used in Destination.js

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import "./Destinations.css"; // Import your CSS file for DestinationItem styling

const DestinationItem = ({ image, title, description, buttonText }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="destination-item">
      <img src={image} alt={title} className="destination-image" />
      <div className="destination-info">
        <h2 className="destinations-title">{title}</h2>
        <p className="destination-description">{description}</p>
        <RouterLink
          to="/contact"
          className="destination-button"
          onClick={scrollToTop}
        >
          {" "}
          {buttonText}{" "}
        </RouterLink>
      </div>
    </div>
  );
};

export default DestinationItem;
