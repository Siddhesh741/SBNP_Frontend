import React, { useState } from "react";
import heroImg from "../assets/img/Hero1.png";
import Footer from "../Common-compo/Footer";
import { Link as RouterLink } from "react-router-dom";
import "./About.css";

const About = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div>
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">
            At Sets By Nature Paradise, we are ready to provide you with the
            best prewedding experience in your life!
          </h1>

          <p className="about-text" style={{ color: "#000000" }}>
            "Your dream prewedding shoot awaits..and we're here to make it a
            reality" 30+ Variety of Sets at one location Sets by natural
            paradise At VEER DAM backwater. <br />
            Immerse yourselves in the breathtaking scenery that complements your
            love story perfectly. Our unique and picturesque sets provide the
            ideal backdrop for capturing timeless moments. From lush greenery to
            serene waters, every corner of our location is designed to enhance
            your shoot. Let us craft an unforgettable prewedding experience
            tailored just for you.
          </p>
          <br />
          <RouterLink to="/contact" className="contact-button">
            Contact Now
          </RouterLink>
        </div>
        <br />
        <div className="about-image about-image-normal">
          <img src={heroImg} alt="Hero" className="about-img" />
        </div>
        <br />
      </div>
      <div class="attractive-box-wrapper">
        <div class="attractive-box">
          <h2 class="attractive-box-title">What we provide..</h2>
          <ul class="attractive-points">
            <li>Boasting over 30+ meticulously crafted themes.</li>
            <li>
              Surround yourself with nature's beauty in our 25+ natural set
              locations, perfect for capturing unforgettable moments.
            </li>
            <li>
              Enjoy the convenience of our changing rooms, ensuring you look
              your best for every shot.
            </li>
            <li>
              Our dedicated support team is here to assist you throughout your
              photoshoot experience.
            </li>
            <li>
              Indulge in delicious snacks to keep your energy levels up during
              your session.
            </li>
            <li>
              Choose from a stunning array of dresses and costumes provided for
              couples, adding flair and style to your photos.
            </li>
            <li>
              With our 24-hour service, your dream photoshoot is just a call
              away.
            </li>
            <li>
              Located conveniently within a 50 km radius from Pune, our venue
              offers easy access for couples seeking the perfect backdrop.
            </li>
            <li>
              Nestled near Veer Dam, our location provides a picturesque setting
              for your pre-wedding photoshoot, surrounded by natural beauty.
            </li>
          </ul>
        </div>
      </div>

      <div className="faq-section-container">
        <div className="faq-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-item" onClick={() => toggleQuestion(0)}>
            <div className="faq-question">
              What is a Sets By Nature Paradise pre-wedding shoot?
              <span
                className={`faq-toggle ${openQuestion === 0 ? "open" : ""}`}
              >
                +
              </span>
            </div>
            {openQuestion === 0 && (
              <div className="faq-answer">
                A pre-wedding shoot is a photo session that typically takes
                place a few months before the wedding day. It allows couples to
                capture special moments in beautiful locations.More than 25+
                sets, 40+ props, 50+ shooting options and more at the one place.
                Now, you don’t have to trouble yourself to find the destinations
                for pre-wedding photography and anything else.
              </div>
            )}
          </div>
          <div className="faq-item" onClick={() => toggleQuestion(1)}>
            <div className="faq-question">
              What we provide to in a pre-wedding shoot for props and
              essentials?
              <span
                className={`faq-toggle ${openQuestion === 1 ? "open" : ""}`}
              >
                +
              </span>
            </div>
            {openQuestion === 1 && (
              <div className="faq-answer">
                We provide props that reflect your personality and relationship,
                such as signs, balloons,glass or flowers. Pack essentials like
                water, snacks, a mirror, and a first aid kit. Include safe
                changing rooms. Also we provide speaker for music to create a
                fun atmosphere with big screen.
              </div>
            )}
          </div>
          <div className="faq-item" onClick={() => toggleQuestion(2)}>
            <div className="faq-question">
              What should I bring along?
              <span
                className={`faq-toggle ${openQuestion === 2 ? "open" : ""}`}
              >
                +
              </span>
            </div>
            {openQuestion === 2 && (
              <div className="faq-answer">
                Before your pre-wedding shoot, ensure you book a professional
                photographer and discuss themes and locations. Choose
                comfortable and thematic outfits along with necessary
                accessories. Carry with you beauty and grooming speciality
                parlour for hair and makeup. Consider adding a drone for aerial
                shots to enhance your photos.
              </div>
            )}
          </div>
          <div className="faq-item" onClick={() => toggleQuestion(3)}>
            <div className="faq-question">
              What if I need to cancel or re-schedule date?
              <span
                className={`faq-toggle ${openQuestion === 3 ? "open" : ""}`}
              >
                +
              </span>
            </div>
            {openQuestion === 3 && (
              <div className="faq-answer">
                If you need to cancel or reschedule your photoshoot, please
                contact us as soon as possible to our Admin. Cancellations or
                rescheduling made at least 48 hours before the scheduled
                photoshoot date .will receive a full refund if anybody did the
                advance payment.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
