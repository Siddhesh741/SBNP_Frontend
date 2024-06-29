import React, { useState, useEffect } from 'react';
import PopupNotification from '../Modules/PopupNotification';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const todayEvents = {
    todayEngagementDates: [27], // Test with an empty array
    todayWeddingDates: [] // Test with an empty array
  };

  useEffect(() => {
    // Logic to determine if popup should be shown
    setShowPopup(true);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && <PopupNotification todayEvents={todayEvents} onClose={closePopup} />}
    </div>
  );
};

export default App;
