import React, { useState, useEffect } from "react";
import "./Home1.css";
import img1 from "../assets/img/80.jpg";
import img4 from "../assets/img/84.jpg";
import img2 from "../assets/img/81.jpg";
import img5 from "../assets/img/85.jpg";
import img3 from "../assets/img/82.jpg";
import { Link as RouterLink } from "react-router-dom";
import Bookingid from "./Bookingid"; // Import the Booking ID page component

const images = [img1, img4, img2, img5, img3];

const Home1 = () => {
  const [isBookingIdOpen, setIsBookingIdOpen] = useState(false); // State to control the visibility of the Booking ID page
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleBookingIdClick = () => {
    // Open the Booking ID page
    setIsBookingIdOpen(true);
  };

  const handleCloseBookingId = () => {
    // Close the Booking ID page
    setIsBookingIdOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="arrow prev" onClick={prevImage}>
        &#10094;
      </div>
      <div className="arrow next" onClick={nextImage}>
        &#10095;
      </div>
      <div className="content-container">
        <div>
          <div className="waterfall">
            <h1 className="title">
              <span>Visit the best place</span>
              <span>for Prewedding & </span>
              <span>many more💞</span>
            </h1>
          </div>
          {/* Redirect to Contact page */}
          <div className="button-container" onClick={scrollToTop}>
            <RouterLink to="/contact" className="book-now-button">
              Book Now
            </RouterLink>
            <div style={{ width: "10px" }}></div>
            <button onClick={handleBookingIdClick} className="book-now-button">
              Booking ID
            </button>
          </div>
          <div className="paragraph-container">
            <p className="paragraph">
              Beautiful and best place near Pune. If you are looking to shoot in
              outdoor nature & backwater destinations that we have to offer.
            </p>
            <p className="paragraph1">
              "Your dream prewedding shoot awaits..& we're here to make it a
              reality".
            </p>
          </div>
          <p className="para">
            "Embrace the Beauty of Nature in Your Pre-Wedding Moments."
          </p>
        </div>
      </div>
      <br />
      <div className="booking-id-container">
        {/* Render the Booking ID page component if it's open */}
        {isBookingIdOpen && <Bookingid onClose={handleCloseBookingId} />}
      </div>
    </div>
  );
};

export default Home1;
