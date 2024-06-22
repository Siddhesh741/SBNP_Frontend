// ShootOptions.js

import React, { useState, useEffect } from 'react';
import './ShootOptions.css';

import preweddingImage from '../assets/img/pre-wed.png';
import babyImage from '../assets/img/Baby.png';
import productImage from '../assets/img/product.png';
import musicVideoImage from '../assets/img/music.png';

const ShootOptions = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const sets = [
    [
      { image: preweddingImage, title: 'Pre-wedding Shoot', text: ' Capture the magic of your love story with our enchanting pre-wedding sets. Featuring stunning natural sunset and romantic night scenes, along with a variety of props, we create the perfect ambiance for unforgettable moments before the big day.' },
      { image: babyImage, title: 'Baby Shoot', text: 'Cherish the precious moments of your little ones early days with our adorable baby shoot sets. Designed for comfort and cuteness, our sets include beautiful natural backdrops and night scenes, along with a variety of props to capture timeless baby portraits.' }
    ],
    [
      { image: productImage, title: 'Product Shoot', text: 'Highlight the beauty and functionality of your products with our professional set designs. Each backdrop, including natural and night settings, is tailored to enhance your product features, ensuring visually stunning and market-ready photos. Numerous props are available to create the perfect scene.' },
      { image: musicVideoImage, title: 'Music Video Shoot', text: 'Elevate your musical brand with our dynamic music shoot sets. Whether you are an emerging artist or a seasoned musician, our creative backdrops, featuring natural sunsets and atmospheric night scenes, along with an array of props, set the stage for striking visuals that resonate with your sound.' }
    ]
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentSet((prevSet) => (prevSet + 1) % sets.length);
        setTransitioning(false);
      }, 500); // Duration of the animation
    }, 7000); // Change sets every 7 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [sets.length]);

  return (
    <div className="carousel-container">
      <div className={`box-container ${transitioning ? 'transitioning' : ''}`}>
        {sets[currentSet].map((box, index) => (
          <div className="box" key={index}>
            <img src={box.image} alt={box.title} className="image" />
            <h3 className="title">{box.title}</h3>
            <p className="text">{box.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShootOptions;
