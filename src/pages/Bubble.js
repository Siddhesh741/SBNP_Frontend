import React from "react";
import "./Bubble.css";

const Bubble = () => {
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
      <div className="big-bubble big-bubble-6">
        <span>Comfort and Convenience</span>
      </div>
    </div>
  );
};

export default Bubble;
