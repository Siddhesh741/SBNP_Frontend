import "./Home.css";
import React from "react";
import Home1 from "../LayoutPage/Home1";
import Location from "../LayoutPage/Location"; // Assuming Location.js is in the same directory as Home.js
import Gallery from "../LayoutPage/Gallery";
import Review from "../LayoutPage/Review";
import TermsConditions from "../LayoutPage/TermsConditions";
import Design from "../LayoutPage/Design";
import Infocount from "../LayoutPage/Infocount";
import Footer from "./Footer";
import { FaArrowCircleUp, FaWhatsapp } from "react-icons/fa";
import ShootOptions from "../LayoutPage/ShootOptions";

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const openWhatsAppChat = () => {
    // Phone number with country code
    const phoneNumber = "919049059045";
    // Message to be sent
    const message = encodeURIComponent("Hii..");
    // WhatsApp API link
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

    // Open WhatsApp chat window
    window.open(whatsappLink, "_blank");
  };

  return (
    <div>
      <Home1 />
      <Location />
      <Infocount />
      <Gallery />
      <Design />
      <ShootOptions />
      <TermsConditions />
      <Review />
      <br></br>
      <Footer />
      <div
        style={{
          textAlign: "center",
          marginTop: "12px",
          marginBottom: "25px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FaArrowCircleUp
          onClick={scrollToTop}
          style={{ fontSize: "30px", cursor: "pointer" }}
        />
      </div>

      {/* Chat with us text */}
      <div className="chat-text-container" onClick={openWhatsAppChat}>
        <span className="chat-text">Chat with us</span>
      </div>

      {/* WhatsApp icon */}
      <div className="whatsapp-icon" onClick={openWhatsAppChat}>
        <FaWhatsapp style={{ fontSize: "30px", cursor: "pointer" }} />
      </div>
    </div>
  );
};

export default Home;
