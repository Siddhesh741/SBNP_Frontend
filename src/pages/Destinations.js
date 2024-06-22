import React from "react";
import DestinationItem from "./DestinationItem"; // Import your DestinationItem component
import "./Destinations.css"; // Import your CSS file
import ReactPlayer from "react-player";
import img1 from "../assets/img/dest11.jpg";
import img2 from "../assets/img/dest22.jpg";
import img3 from "../assets/img/dest3333.jpg";
import Footer from "../Common-compo/Footer";

const Destinations = () => {
  return (
    <div className="destinations-container">
      <div className="heading-container">
        <div className="headingg">
          <span role="img" aria-label="location-pin">📍</span>
          Most Popular Sets
          <span role="img" aria-label="location-pin">📍</span>
        </div>
      </div>

      <div className="destinations-list">
        <DestinationItem
          image={img1}
          title="Backwater Sets"
          description="Veer Dam's scenic beauty during sunset offers a captivating blend of nature's splendor, making it an ideal spot for those seeking the serene and breathtaking moments. It's a mesmerizing experience for couples and photographers alike. The tranquil waters and golden hues provide the perfect backdrop for romantic pre-wedding shoots, capturing the essence of love and tranquility. Whether it's the gentle ripples of the water or the vibrant colors of the sky, every element adds to the magic of the moment."
          buttonText="Book Now"
        />
        <DestinationItem
          image={img2}
          title="Night-Light Sets"
          description="Capturing the enchantment of night sets with couples is a delicate dance of shadows and lights. The interplay between artificial illumination and the serene night sky creates a mesmerizing canvas. Perfect for those who want to showcase the romance and mystery of night, these sets highlight the beauty of love under the stars. From the soft glow of lanterns to the twinkling city lights, each element contributes to creating an unforgettable atmosphere that is both intimate and magical."
          buttonText="Book Now"
        />
        <DestinationItem
          image={img3}
          title="Outdoor Shoot"
          description="Elevate pre-wedding photography to new heights with captivating outdoor drone shots, weaving a story that unfolds against the breathtaking backdrop of rustic villages. This unique perspective captures the vastness and beauty of the landscape, adding a dynamic element to traditional photography. The contrast between the modern drone technology and the timeless charm of the countryside creates stunning visuals that are both innovative and nostalgic, perfect for couples looking to create lasting memories."
          buttonText="Book Now"
        />
      </div>

      <div className="video-container">
        <div className="video-wrapper">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=le48udYlfsA"
            controls={true}
            width="100%"
            height="400px"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Destinations;
