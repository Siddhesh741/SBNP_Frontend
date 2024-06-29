import React, { useEffect } from "react";
import "./PopupNotification.css";

const PopupNotification = ({ todayEvents, onClose }) => {
  const { todayEngagementDates, todayWeddingDates } = todayEvents;

  // Automatically close the popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Call onClose function after 10 seconds
    }, 10000);

    return () => clearTimeout(timer); // Cleanup function
  }, [onClose]);

  const isBothEventsToday = todayEngagementDates.length > 0 && todayWeddingDates.length > 0;

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Today's Events</h2>
        {todayEngagementDates.length === 0 && todayWeddingDates.length === 0 && (
          <p>Sorry, No events today.</p>
        )}
        {isBothEventsToday ? (
          <p>Great, today is a wedding and engagement date.</p>
        ) : (
          <>
            {todayEngagementDates.length > 0 && (
              <div>
                <ul>
                  {todayEngagementDates.map((date, index) => (
                    <li key={index} className="engagement-date">Great, today is an engagement date.</li>
                  ))}
                </ul>
              </div>
            )}
            {todayWeddingDates.length > 0 && (
              <div>
                <ul>
                  {todayWeddingDates.map((date, index) => (
                    <li key={index} className="wedding-date">Great, today is a wedding date.</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopupNotification;
