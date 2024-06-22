import React from "react";
import video from "../assets/img/6.mp4";
import "./Design.css"; // Import the CSS file for styling

const Design = () => {
  return (
    <div className="design-container">
      <div className="video-wrapper">
        <video autoPlay loop muted className="video-background">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="text-overlay">
        <h1>Photoshoot</h1>
        <p>Make your moments unforgettable</p>
      </div>
    </div>
  );
};

export default Design;
