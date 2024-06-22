import React from "react";
import "./Footer.css";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { BsInstagram, BsFacebook, BsWhatsapp } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p className="footer-text">
            With a Sets by nature Paradise you can experience new sets around
            you. We provide the best prewedding destinations that we have to
            offer you. Physically managed by{" "}
            <a
              href="https://www.instagram.com/samgirrahul?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="Instagram"
              style={{ color: "#2FC1FF" }}
            >
              MR. RAHUL SAMGIR
            </a>
          </p>
        </div>

        <div className="footer-links1">
          <RouterLink to="/Destinations" onClick={scrollToTop}>
            Sunset Sets
          </RouterLink>
          <br />
          <RouterLink to="/Destinations" onClick={scrollToTop}>
            Night-Light Sets
          </RouterLink>
          <br />
          <RouterLink to="/Destinations" onClick={scrollToTop}>
            All Sets Package
          </RouterLink>
        </div>

        <div className="footer-links">
          <RouterLink to="/about" onClick={scrollToTop}>
            About
          </RouterLink>
          <br />
          <RouterLink to="/contact" onClick={scrollToTop}>
            Contact
          </RouterLink>
          <br />
          <RouterLink to="/destinations" onClick={scrollToTop}>
            Destination
          </RouterLink>
        </div>

        <div className="footer-social">
          <a
            href="https://www.instagram.com/sets_by_nature_paradise?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram class1="hover-effect" className="icon" />
          </a>
          <a
            href="https://wa.me/9049059045"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsWhatsapp
              icon={fab.faWhatsapp}
              class1="hover-effect"
              className="icon"
            />
          </a>
          <a href="https://www.instagram.com/taranginiiagrofarms?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
            <BsFacebook class1="hover-effect" className="icon" />
          </a>
        </div>
      </div>
      
      <hr className="footer-line" />
      <div className="footer-copyright">
        <p>
          &copy;2024 Design & developed by {""}
          <a
            href="https://www.dnextgentechnologies.com/"
            target="website"
            style={{ color: "#2FC1FF" }}
          >
            dNextgen Technologies Private Limited !!
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
