import React, { useState } from "react";
import img1 from "../assets/img/Swapnil.jpg";
import img2 from "../assets/img/Anant.jpg";
import img3 from "../assets/img/Sakshi.jpg";
import "./Review.css"; 

const Review = () => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  const toggleExpanded1 = () => {
    setExpanded1(!expanded1);
  };

  const toggleExpanded2 = () => {
    setExpanded2(!expanded2);
  };

  const toggleExpanded3 = () => {
    setExpanded3(!expanded3);
  };

  return (
    <div className="review-container">
      <h1 className="review-title">⭐ REVIEWS ⭐</h1>

      <div className="review-cards">
        <div className="review-card">
          <h3>
            <span className="bold-name">SWAPNIL DAWARE</span>
          </h3>
          <div className="rating">
            <span>RATING:</span>
            <div className="stars">⭐⭐⭐⭐</div>
          </div>
          <br></br>
          <img src={img1} alt="Customer 1" className="customer-img" />
          <p className={expanded1 ? "expanded" : "collapsed"}>
            Amazing experience. I recently had the pleasure of experiencing a
            prewedding shoot at Sets by Nature Paradise. The service provided by
            the cooperative team ensures a seamless and delightful experience.
            The lush greenery, Veer Dam backwater, and the golden hues of the
            setting sun combine to make every frame a work of art. Blends
            nature, beautiful sets, and exceptional service. The Staff is very
            helpful; this was the best location, highly recommended, and thank
            you for the great hospitality. Special thanks to Rahul sir to make
            this happen so smoothly.
          </p>
          <button onClick={toggleExpanded1} className="read-more">
            {expanded1 ? "Read less" : "Read more..."}
          </button>
        </div>

        <div className="review-card">
          <h3>
            <span className="bold-name">ANANT JAGTAP</span>
          </h3>
          <div className="rating">
            <span>RATING:</span>
            <div className="stars">⭐⭐⭐⭐</div>
          </div>
          <br></br>
          <img src={img2} alt="Customer 2" className="customer-img" />
          <p className={expanded2 ? "expanded" : "collapsed"}>
            "Photoshoot with Sets by Nature Paradise is so much fun! They have
            an incredible creative eye for shooting beautiful photos. I highly
            recommend her for Preweddings, family photos, and especially for
            Maternity shoot, Babies Shoot, blog photos. This photo shoot
            location is a hidden gem near Pune. The backdrop of the Veer Dam
            backwater with the sunset is truly magical. The waves add an extra
            charm to the photos. What sets this location apart is the caring and
            supportive managing team. The boat ride adds an adventurous touch to
            the shoot. Highly recommended for couples looking for a prewedding
            location.
          </p>
          <button onClick={toggleExpanded2} className="read-more">
            {expanded2 ? "Read less" : "Read more..."}
          </button>
        </div>

        <div className="review-card">
          <h3>
            <span className="bold-name">SAKSHI RAVET</span>
          </h3>
          <div className="rating">
            <span>RATING:</span>
            <div className="stars">⭐⭐⭐</div>
          </div>
          <br></br>
          <img src={img3} alt="Customer 3" className="customer-img" />
          <p className={expanded3 ? "expanded" : "collapsed"}>
            The photo shoot location behind the Veer Dam backwater is absolutely
            breathtaking. The sunset views are mesmerizing, and the waves create
            a perfect backdrop for any photoshoot. The pleasant environment with
            natural birds sound like peaceful & relaxing momemt for mind .The
            facilities, including toilets and changing rooms, are
            well-maintained and convenient. The managing team is incredibly
            helpful and caring, ensuring that every aspect of the shoot goes
            smoothly. I highly recommend this location for prewedding shoots or
            any photography sessions near Pune.
          </p>
          <button onClick={toggleExpanded3} className="read-more">
            {expanded3 ? "Read less" : "Read more..."}
          </button>
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default Review;
