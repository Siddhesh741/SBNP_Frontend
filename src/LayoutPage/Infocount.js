import React, { useState, useEffect } from "react";
import "./Infocount.css"; // Import CSS file for styling

const Info = () => {
  const [totalSets, setTotalSets] = useState(0);
  const [shootOptions, setShootOptions] = useState(0);
  const [propsCount, setPropsCount] = useState(0);
  const [bookingMandatory, setBookingMandatory] = useState(0);
  const [happyCustomers, setHappyCustomers] = useState(0);
  const [serviceAvailable, setServiceAvailable] = useState(0);
  const [naturalSets, setNaturalSets] = useState(0);
  const [friendlyEnvironment, setFriendlyEnvironment] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment counts until they reach their respective targets
      setTotalSets((prevTotalSets) =>
        prevTotalSets < 25 ? prevTotalSets + 1 : prevTotalSets
      );
      setShootOptions((prevShootOptions) =>
        prevShootOptions < 50 ? prevShootOptions + 1 : prevShootOptions
      );
      setPropsCount((prevPropsCount) =>
        prevPropsCount < 40 ? prevPropsCount + 1 : prevPropsCount
      );
      setBookingMandatory((prevBookingMandatory) =>
        prevBookingMandatory < 100
          ? prevBookingMandatory + 1
          : prevBookingMandatory
      );
      setHappyCustomers((prevHappyCustomers) =>
        prevHappyCustomers < 1300 ? prevHappyCustomers + 10 : prevHappyCustomers
      );
      setServiceAvailable((prevServiceAvailable) =>
        prevServiceAvailable < 24
          ? prevServiceAvailable + 1
          : prevServiceAvailable
      );
      setNaturalSets((prevNaturalSets) =>
        prevNaturalSets < 15 ? prevNaturalSets + 1 : prevNaturalSets
      );
      setFriendlyEnvironment((prevFriendlyEnvironment) =>
        prevFriendlyEnvironment < 100
          ? prevFriendlyEnvironment + 1
          : prevFriendlyEnvironment
      );
    }, 15); // Adjust the interval for the speed of counting

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Removed dependency array

  // Reset counts after a delay
  useEffect(() => {
    const resetTimeout = setTimeout(() => {
      setTotalSets(0);
      setShootOptions(0);
      setPropsCount(0);
      setBookingMandatory(0);
      setHappyCustomers(0);
      setServiceAvailable(0);
      setNaturalSets(0);
      setFriendlyEnvironment(0);
    }, 15000); // Automatically Reset counts after 15 seconds

    // Clean up the timeout on component unmount
    return () => clearTimeout(resetTimeout);
  }, [totalSets]); // Watch totalSets to trigger the reset

  return (
    <div className="info-container">
      <div className="info-item">
        <div className="number">{totalSets}+</div>
        <div className="text">Total Sets</div>
      </div>

      <div className="info-item">
        <div className="number">{shootOptions}+</div>
        <div className="text">Shoot Options</div>
      </div>

      <div className="info-item">
        <div className="number">{naturalSets}+</div>
        <div className="text">Natural Sets</div>
      </div>

      <div className="info-item">
        <div className="number">{propsCount}+</div>
        <div className="text">Props Options</div>
      </div>

      <div className="info-item">
        <div className="number">{bookingMandatory}%</div>
        <div className="text">Booking Mandatory</div>
      </div>

      <div className="info-item">
        <div className="number">{happyCustomers}+</div>
        <div className="text">Happy customers</div>
      </div>

      <div className="info-item">
        <div className="number">{serviceAvailable}/7</div>
        <div className="text">Service Available</div>
      </div>

      <div className="info-item">
        <div className="number">{friendlyEnvironment}%</div>
        <div className="text">Friendly Environment</div>
      </div>
    </div>
  );
};

export default Info;
