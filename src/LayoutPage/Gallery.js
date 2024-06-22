import React, { useState, useEffect } from "react";
import "./Gallery.css";

import img1 from "../assets/img/5.jpg";
import img2 from "../assets/img/8.jpg";
import img3 from "../assets/img/7.jpg";
import img4 from "../assets/img/24.jpg";
import img5 from "../assets/img/10.jpg";
import img6 from "../assets/img/12.jpg";
import img7 from "../assets/img/26.jpg";
import img8 from "../assets/img/11.jpg";
import img9 from "../assets/img/222.jpg";
import img19 from "../assets/img/30.jpg";
import img20 from "../assets/img/31.jpg";
import img21 from "../assets/img/32.jpg";

import img10 from "../assets/img/6.jpg";
import img11 from "../assets/img/13.jpg";
import img12 from "../assets/img/14.jpg";
import img13 from "../assets/img/19.jpg";
import img14 from "../assets/img/16.jpg";
import img15 from "../assets/img/17.jpg";
import img16 from "../assets/img/41.jpg";
import img17 from "../assets/img/9.jpg";
import img18 from "../assets/img/42.jpg";

const Gallery = () => {
  const allImages = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img19,
    img20,
    img21,
    img17,
    img18,
    img16,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
  ];

  const itemsPerGroup = 3;
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const totalGroups = Math.ceil(allImages.length / itemsPerGroup);
      setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % totalGroups);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, [allImages.length]);

  const startIndex = currentGroupIndex * itemsPerGroup;
  const endIndex = startIndex + itemsPerGroup;
  const currentImages = allImages.slice(startIndex, endIndex);

  return (
    <div>
      <div className="gallery-container1">
        {currentImages.map((image, index) => (
          <div key={index} className="gallery-item1">
            <img
              src={image}
              alt={`Imagee ${startIndex + index + 1}`}
              className="gallery-image1"
            />
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default Gallery;
