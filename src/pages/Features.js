import React from "react";
import "./Features.css"; // Import CSS file for styling
import img from "../assets/img/feature11.jpg";
import pic1 from "../assets/img/service.jpg";
import pic2 from "../assets/img/unforgotable.jpg";
import pic3 from "../assets/img/support.jpg";
import pic4 from "../assets/img/affordable.jpg";
import pic5 from "../assets/img/facilities.jpg";

import Bubble from "./Bubble";
import Footer from "../Common-compo/Footer";
import ReactPlayer from "react-player";

const Features = () => {

  document.addEventListener("DOMContentLoaded", function () {
    const featureRows = document.querySelectorAll(".feature");
  
    let lastScrollTop = 0;
  
    function checkScroll() {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
  
      featureRows.forEach((row, index) => {
        const position = row.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5; // Adjust as needed
  
        if (position < screenPosition) {
          row.classList.add(index % 2 === 0 ? "slide-in-left" : "slide-in-right");
        }
      });
  
      // Determine scroll direction
      const scrollDirection = currentScrollTop > lastScrollTop ? "down" : "up";
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  
      // Add classes based on scroll direction
      if (scrollDirection === "down") {
        document.body.classList.remove("scroll-up");
        document.body.classList.add("scroll-down");
      } else {
        document.body.classList.remove("scroll-down");
        document.body.classList.add("scroll-up");
      }
    }
  
    window.addEventListener("scroll", checkScroll);
    checkScroll();
  });
  
  return (
    <div className="features-container">
      <div className="features-content">
        <div className="features-text">
          <h1 className="features-title">
            "From the Heart of Nature to the Heart of Your Memories."
          </h1>
          <br></br>
          <p>
            Discover the Best Prewedding Experiences with set by nature
            paradise! We're dedicated to curating the latest and greatest sets
            from around the veer dam ensuring you always get the ultimate and
            best shoot moments experience.
          </p>
        </div>
        <br></br>
        <div className="features-image">
          <img className="features-img" src={img} alt="img" />
        </div>
      </div>

      <br></br>

      <div className="features-details">
      <div className="feature alternate">
          <div className="feature-text">
            <h1 className="feature-title">Friendly Service</h1>
            <p className="feature-description">
              We will provide excellent & friendly service for the sake of our
              customers also a couples. Our team is dedicated to making your
              experience as smooth and enjoyable as possible, ensuring that all
              your needs are met with a smile. We believe in building lasting
              relationships with our clients through exceptional service and
              care.
            </p>
          </div>
          <div className="feature-icon">
            <img src={pic1} alt="Friendly Service" />
          </div>
        </div>

        <br></br>

        <div className="feature alternate">
          <div className="feature-icon">
            <img src={pic2} alt="Unforgettable Experience" />
          </div>
          <div className="feature-text">
            <h1 className="feature-title">Unforgettable Experience</h1>
            <p className="feature-description">
              We will provide excellent and unforgettable experience captured in
              high-quality images for our customers. Our professional
              photographers are skilled in capturing those perfect moments that
              you'll cherish forever. From candid shots to perfectly posed
              pictures, we ensure every memory is beautifully preserved.
            </p>
          </div>
        </div>

        <br></br>
        <div className="feature alternate">
          <div className="feature-text">
            <h1 className="feature-title">Affordable Prices</h1>
            <p className="feature-description">
              We provide our services & packages at affordable & pocket-friendly
              prices for our customers. No need to break the bank for a
              high-quality prewedding experience. We offer various packages to
              fit different budgets without compromising on quality. Enjoy
              premium services at prices you'll love.
            </p>
          </div>
          <div className="feature-icon">
            <img src={pic4} alt="Affordable Prices" />
          </div>
        </div>

        <br></br>

        <div className="feature alternate">
          <div className="feature-icon">
            <img src={pic5} alt="Provide many Facilities" />
          </div>
          <div className="feature-text">
            <h1 className="feature-title">Provide many Facilities</h1>
            <p className="feature-description">
              We provide our customers with excellent facilities like a changing
              room, snacks, and clean washroom. Our aim is to ensure your
              comfort throughout your stay with us. Whether you need a quick
              refreshment break or a place to change outfits, we've got you
              covered. Relax and enjoy your photoshoot without any hassle.
            </p>
          </div>
        </div>

        <br></br>

        <div className="feature alternate">
         
          <div className="feature-text">
            <h1 className="feature-title">24/7 Support</h1>
            <p className="feature-description">
              Our support team is available 24/7 to assist you with any queries
              or issues you may have. Whether you need help with booking,
              customization, or any other concern, we're here to help. Contact
              us anytime, and we’ll be more than happy to assist you. Your
              satisfaction is our top priority.
            </p>
          </div>
          <div className="feature-icon">
            <img src={pic3} alt="24/7 Support" />
          </div>
        </div>

      
        <br></br>
        <Bubble />
      </div>

      <br></br>

      {/* Youtube video link */}
      <div className="video-container">
        <div className="video-wrapper">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=s_4bO2tz5Ys&t=45s"
            controls={true}
            width="100%"
            height="400px"
          />
        </div>
      </div>

     
      <br></br>
      <Footer />
    </div>
  );
};

export default Features;
