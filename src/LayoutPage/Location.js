import React, { useEffect, useRef } from "react";
import "./Location.css";
import videoFile from "../assets/img/1.mp4";
import videoFile1 from "../assets/img/7.mp4";

function Location() {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  useEffect(() => {
    let lastScrollTop = 0;

    function handleScroll() {
      const st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > lastScrollTop) {
        // Scroll down
        if (
          videoRef1.current &&
          videoRef2.current &&
          !videoRef1.current.classList.contains("animate")
        ) {
          videoRef1.current.classList.add("animate");
        }
        if (
          videoRef2.current &&
          !videoRef2.current.classList.contains("animate")
        ) {
          videoRef2.current.classList.add("animate");
        }
      }

      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="location-container" style={{ textAlign: "center" }}>
      <div className="video-container1">
        <video
          src={videoFile}
          width="100%"
          height="auto"
          autoPlay
          loop
          muted
          ref={videoRef1}
          className="video-left"
        ></video>
        <video
          src={videoFile1}
          width="100%"
          height="auto"
          autoPlay
          loop
          muted
          ref={videoRef2}
          className="video-right"
        ></video>
      </div>

      <div className="location-details text-center py-4">
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#2FC1FF",
            marginTop: "20px",
          }}
        >
          <span role="img" aria-label="location-pin">
            📍
          </span>{" "}
          Location Details{" "}
          <span role="img" aria-label="location-pin">
            📍
          </span>
        </h2>
        <div className="location-box inline-block mx-auto p-4 border-2 border-gray-300 rounded-lg shadow-lg">
          <p
            style={{ fontSize: "18px", lineHeight: "1.6" }}
            className="location-text"
          >
            <strong>
              At post Veer Samgirwadi, Taluka-Purandar, Dist-Pune, Sets By
              Nature Paradise & Tarangini Farms behind ZP school.
            </strong>
          </p>
        </div>
      </div>

      {/* Location Google map link */}
      <div
        style={{
          margin: "auto",
          width: "57%",
          alignContent: "center",
          justifyContent: "center",
          marginTop: "1%",
       
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30331.51861312248!2d74.0507282347656!3d18.143641900000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2f90041ba2c61%3A0xde1582d0bb10dc48!2sSet%20By%20Nature%20Paradise!5e0!3m2!1sen!2sin!4v1717170266783!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <br />
      <div className="instagram-link">
        <p
          style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Watch more videos & photos on Instagram click..
          <a
            href="https://www.instagram.com/sets_by_nature_paradise?igsh=MXdsZWF0em0zcHFoZA=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-all cursor-pointer"
          >
            {" "}
            <span className="highlight-box">here ↗️</span>
          </a>
        </p>
        <br />
      </div>
    </div>
  );
}

export default Location;
