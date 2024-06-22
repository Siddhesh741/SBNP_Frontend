import React from "react";
import Footer from "../Common-compo/Footer";
import "./Oursets.css"; // Import CSS file for styling

import { Link as RouterLink } from "react-router-dom";

import img1 from "../assets/img/55.jpg";
import img2 from "../assets/img/67.jpg";
import img3 from "../assets/img/73.jpg";

import img13 from "../assets/img/66.jpg";
import img14 from "../assets/img/61.jpg";
import img15 from "../assets/img/64.jpg";

import img4 from "../assets/img/71.jpg";
import img5 from "../assets/img/31.jpg";
import img6 from "../assets/img/23.jpg";

import img7 from "../assets/img/65.jpg";
import img8 from "../assets/img/57.jpg";
import img9 from "../assets/img/58.jpg";

import img10 from "../assets/img/59.jpg";
import img11 from "../assets/img/9.jpg";
import img12 from "../assets/img/12.jpg";

import img16 from "../assets/img/69.jpg";
import img17 from "../assets/img/17.jpg";
import img18 from "../assets/img/72.jpg";

import img19 from "../assets/img/42.jpg";
import img20 from "../assets/img/74.jpg";
import img21 from "../assets/img/7.jpg";

import img22 from "../assets/img/1.jpg";
import img23 from "../assets/img/86.jpg";
import img24 from "../assets/img/2.jpg";

import img25 from "../assets/img/76.jpg";
import img26 from "../assets/img/77.jpg";
import img27 from "../assets/img/78.jpg";
const Oursets = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="image-grid">
        <div className="image-container1">
          <img src={img7} alt="img7" className="zoomable" />
          <p>Pillow fight</p>
        </div>
        <div className="image-container1">
          <img src={img10} alt="img10" className="zoomable" />
          <p>Bliss</p>
        </div>
        <div className="image-container1">
          <img src={img9} alt="img9" className="zoomable" />
          <p>Alpha</p>
        </div>

        <div className="image-container1">
          <img src={img1} alt="img1" className="zoomable" />
          <p>Sweetheart</p>
        </div>
        <div className="image-container1">
          <img src={img2} alt="img2" className="zoomable" />
          <p>Candle Light</p>
        </div>
        <div className="image-container1">
          <img src={img3} alt="img3" className="zoomable" />
          <p>The flags</p>
        </div>

        <div className="image-container1">
          <img src={img4} alt="img4" className="zoomable" />
          <p>By cycle</p>
        </div>
        <div className="image-container1">
          <img src={img5} alt="img5" className="zoomable" />
          <p>Bullock Cart</p>
        </div>
        <div className="image-container1">
          <img src={img6} alt="img6" className="zoomable" />
          <p>Love shape</p>
        </div>

        <div className="image-container1">
          <img src={img13} alt="img13" className="zoomable" />
          <p>Piono</p>
        </div>
        <div className="image-container1">
          <img src={img15} alt="img15" className="zoomable" />
          <p>Tree trunk</p>
        </div>
        <div className="image-container1">
          <img src={img14} alt="img14" className="zoomable" />
          <p>Boat</p>
        </div>

        <div className="image-container1">
          <img src={img8} alt="img8" className="zoomable" />
          <p>Chunariya</p>
        </div>
        <div className="image-container1">
          <img src={img11} alt="img11" className="zoomable" />
          <p>Tabebuia rosea</p>
        </div>
        <div className="image-container1">
          <img src={img12} alt="img12" className="zoomable" />
          <p>Sunset</p>
        </div>

        <div className="image-container1">
          <img src={img22} alt="img22" className="zoomable" />
          <p>Bornfire</p>
        </div>
        <div className="image-container1">
          <img src={img23} alt="img23" className="zoomable" />
          <p>Riverside Hut</p>
        </div>
        <div className="image-container1">
          <img src={img24} alt="img24" className="zoomable" />
          <p>Love of Tunnel</p>
        </div>

        <div className="image-container1">
          <img src={img19} alt="img19" className="zoomable" />
          <p>Sawari</p>
        </div>
        <div className="image-container1">
          <img src={img20} alt="img20" className="zoomable" />
          <p>Guitar</p>
        </div>
        <div className="image-container1">
          <img src={img21} alt="img21" className="zoomable" />
          <p>Ring of Flower</p>
        </div>

        <div className="image-container1">
          <img src={img16} alt="img16" className="zoomable" />
          <p>Relfection shade</p>
        </div>
        <div className="image-container1">
          <img src={img18} alt="img18" className="zoomable" />
          <p>Mr. & Mrs.</p>
        </div>
        <div className="image-container1">
          <img src={img17} alt="img17" className="zoomable" />
          <p>The Tilt</p>
        </div>

        <div className="image-container1">
          <img src={img25} alt="img25" className="zoomable" />
          <p>Shoot with chair</p>
        </div>
        <div className="image-container1">
          <img src={img26} alt="img26" className="zoomable" />
          <p>The Prayer flag</p>
        </div>
        <div className="image-container1">
          <img src={img27} alt="img27" className="zoomable" />
          <p>Walk with waves</p>
        </div>

        <br></br>

        <div id="scroll-to-top">
          <a href="#top" className="scroll-to-top-link">
            &#8593;
          </a>
        </div>

        <div className="book-slot-button-container">
          <RouterLink to="/contact">
            <button className="book-slot-button" onClick={scrollToTop}>
              👉Book Your Slot👈
            </button>
          </RouterLink>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Oursets;
