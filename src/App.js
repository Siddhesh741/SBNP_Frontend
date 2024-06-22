// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../src/Common-compo/Navbar";
import Home from "./Common-compo/Home";
import Features from "../src/pages/Features";
import Gallery from "./pages/Gallery";
import Oursets from "../src/pages/Oursets";
import Destinations from "../src/pages/Destinations";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import Admin from "../src/Modules/Admin";
import Bookingid from "./LayoutPage/Bookingid";

//import '../src/components/Style.css'
import "tailwindcss/tailwind.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookingid" component={Bookingid} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Oursets" element={<Oursets />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
