import React from "react";
import "./TermsConditions.css"; 
import img from "../assets/img/dest22.jpg";

const TermsConditions = () => {
  return (
    <div className="terms-container">
      <div className="features-content">
        <div className="features-text">
          <h1 className="features-title1">
            Under the night sky, with a glass of wine in hand, our love sparkles
            like the constellations above💕
          </h1>
          <br></br>
          <p style={{ fontSize: "20px" }}>
            Veer Dam situated near Pune is known for its serene backwater
            surrounded by lush greenery and backwater with sunset.Veer Dam
            backwater offers a picturesque and secluded location for a memorable
            night under the stars. Remember to plan your shoot during suitable
            weather conditions to make the most of this enchanting setting.
          </p>
        </div>
        <br></br>
        <div className="centered-image">
          <img className="centered-img" src={img} alt="img" />
        </div>
      </div>

      <br></br>

      <div className="terms-details">
        <div className="feature">
          <div className="feature-text">
            <h1 className="feature-title2">📢Terms & Conditions📢</h1>
            <br></br>
            <div className="feature-description">
              <p>🔖Photoshoot Time will be 4:00 PM to 9:30 PM.</p>
              <p>
                🏷️50% Advance payment is mandatory while booking photoshoot
                slot.
              </p>
              <p>🔖100% payment is mandatory before start of photoshoot.</p>
              <p>
                🏷️Any damage to property or photoshoot set by customer or
                photographer should be compensated by them.
              </p>
              <p>
                🔖We believe in policy that Customer is KING and KING never
                Bargains.
              </p>
            </div>
          </div>
   
          <br></br>
        </div>
      </div>
      <br></br>
      
    </div>
  );
};

export default TermsConditions;
