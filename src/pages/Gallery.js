import React, { useState, useEffect } from 'react';
import './Gallery.css';

import img1 from "../assets/img/101.webp";
import img2 from "../assets/img/102.jpg";
import img3 from "../assets/img/103.webp";
import img34 from "../assets/img/134.jpg";
import img35 from "../assets/img/135.jpg";
import img36 from "../assets/img/42.jpg";

import img4 from "../assets/img/104.jpg";
import img5 from "../assets/img/105.jpg";
import img6 from "../assets/img/106.jpg";
import img7 from "../assets/img/107.jpg";
import img8 from "../assets/img/108.webp";
import img9 from "../assets/img/109.webp";

import img10 from "../assets/img/110.jpg";
import img11 from "../assets/img/111.jpg";
import img12 from "../assets/img/112.webp";
import img13 from "../assets/img/113.webp";
import img14 from "../assets/img/114.webp";
import img15 from "../assets/img/115.jpg";

import img16 from "../assets/img/116.jpg";
import img17 from "../assets/img/117.jpg";
import img18 from "../assets/img/118.jpg";
import img19 from "../assets/img/119.jpg";
import img20 from "../assets/img/120.jpg";
import img21 from "../assets/img/121.jpg";

import img22 from "../assets/img/122.jpg";
import img23 from "../assets/img/123.webp";
import img24 from "../assets/img/23.jpg";
import img25 from "../assets/img/125.jpg";
import img26 from "../assets/img/126.jpg";
import img27 from "../assets/img/127.jpg";

import img28 from "../assets/img/128.jpg";
import img29 from "../assets/img/129.jpg";
import img30 from "../assets/img/130.jpg";
import img31 from "../assets/img/131.webp";
import img32 from "../assets/img/132.webp";
import img33 from "../assets/img/133.jpg";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('reflection');
  const [isAnimating, setIsAnimating] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => setInitialLoad(false), 500); // Adjust time to match the animation duration
  }, []);

  const images = [
    { src: img1, category: 'sawari' },
    { src: img2, category: 'sawari' },
    { src: img3, category: 'sawari' },
    { src: img34, category: 'sawari' },
    { src: img35, category: 'sawari' },
    { src: img36, category: 'sawari' },

    { src: img4, category: 'boat' },
    { src: img5, category: 'boat' },
    { src: img6, category: 'boat' },
    { src: img7, category: 'boat' },
    { src: img8, category: 'boat' },
    { src: img9, category: 'boat' },

    { src: img10, category: 'alpha' },
    { src: img11, category: 'alpha' },
    { src: img12, category: 'alpha' },
    { src: img13, category: 'alpha' },
    { src: img14, category: 'alpha' },
    { src: img15, category: 'alpha' },

    { src: img16, category: 'candle' },
    { src: img17, category: 'candle' },
    { src: img18, category: 'candle' },
    { src: img19, category: 'candle' },
    { src: img20, category: 'candle' },
    { src: img21, category: 'candle' },

    { src: img22, category: 'love' },
    { src: img23, category: 'love' },
    { src: img24, category: 'love' },
    { src: img25, category: 'love' },
    { src: img26, category: 'love' },
    { src: img27, category: 'love' },

    { src: img28, category: 'reflection' },
    { src: img29, category: 'reflection' },
    { src: img30, category: 'reflection' },
    { src: img31, category: 'reflection' },
    { src: img32, category: 'reflection' },
    { src: img33, category: 'reflection' },
  ];

  const handleCategoryClick = (category) => {
    if (category !== selectedCategory) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedCategory(category);
        setIsAnimating(false);
      }, 500);
    }
  };

  const filteredImages = images.filter(image => image.category === selectedCategory);

  return (
    <div className='bg'>
    <div className="gallery-container5">
      <div className={`category-names5 ${initialLoad ? 'initial-load' : ''}`}>
        <span className={selectedCategory === 'reflection' ? 'active5' : ''} onClick={() => handleCategoryClick('reflection')}>REFLECTION-SHADE</span>
        <span className={selectedCategory === 'candle' ? 'active5' : ''} onClick={() => handleCategoryClick('candle')}>CANDLE-LIGHT</span>
        <span className={selectedCategory === 'love' ? 'active5' : ''} onClick={() => handleCategoryClick('love')}>LOVE-SHAPE</span>
        <span className={selectedCategory === 'boat' ? 'active5' : ''} onClick={() => handleCategoryClick('boat')}>BOAT</span>
        <span className={selectedCategory === 'alpha' ? 'active5' : ''} onClick={() => handleCategoryClick('alpha')}>ALPHA</span>
        <span className={selectedCategory === 'sawari' ? 'active5' : ''} onClick={() => handleCategoryClick('sawari')}>SAWARI</span>
      </div>
      <div className={`gallery5 ${isAnimating ? 'exiting' : 'entering'} ${initialLoad ? 'initial-load' : ''}`}>
        {filteredImages.map((image, index) => (
          <div className="image-container5" key={index}>
            <img src={image.src} alt={image.category} className="gallery-image5" />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Gallery;
