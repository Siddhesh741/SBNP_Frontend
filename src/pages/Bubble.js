// Bubble.js

import React, { useEffect } from "react";
import "./Bubble.css";

const Bubble = () => {
  useEffect(() => {
    const moveBubbles = () => {
      const container = document.querySelector(".big-bubble-container");
      if (!container) return; // Ensure container exists

      const bubbles = container.querySelectorAll(".big-bubble");
      bubbles.forEach((bubble) => {
        let x, y;
        do {
          x = Math.random() * (container.offsetWidth - bubble.offsetWidth);
          y = Math.random() * (container.offsetHeight - bubble.offsetHeight);
        } while (isOverlapping(x, y, bubble, bubbles));

        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
      });
    };

    const isOverlapping = (x, y, bubble, bubbles) => {
      for (let i = 0; i < bubbles.length; i++) {
        if (bubbles[i] !== bubble) {
          const rect1 = bubble.getBoundingClientRect();
          const rect2 = bubbles[i].getBoundingClientRect();
          if (
            x < rect2.right &&
            x + rect1.width > rect2.left &&
            y < rect2.bottom &&
            y + rect1.height > rect2.top
          ) {
            return true;
          }
        }
      }
      return false;
    };

    const intervalId = setInterval(moveBubbles, 3000); // Adjust speed of movement here

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures effect runs only once after initial render

  return (
    <div className="big-bubble-container">
      {/* Big bubbles */}
      <div className="big-bubble big-bubble-1">
        <span>Multiple Sets</span>
      </div>
      <div className="big-bubble big-bubble-2">
        <span>Memorable Experience</span>
      </div>
      <div className="big-bubble big-bubble-3">
        <span>Props and Accessories</span>
      </div>
      <div className="big-bubble big-bubble-4">
        <span>Versatile Themes</span>
      </div>
      <div className="big-bubble big-bubble-5">
        <span>Scenic Backdrops</span>
      </div>

      <div className="big-bubble big-bubble-7">
        <span>Comfort and Convenience</span>
      </div>
    </div>
  );
};

export default Bubble;
