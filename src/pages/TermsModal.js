import React from "react";
import "./TermsModal.css";

const TermsModal = ({ onClose, onAccept }) => {
  const handleAccept = () => {
    if (onAccept) {
      onAccept(); // Call the onAccept callback to update the state in the parent component
    }
    onClose(); // Close the modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Terms and Conditions</h2>
          <button className="close-button1" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="terms-containerr">
            <ul>
              <li><span className="bullet">&#8226;</span> Strictly NO entry into RIVER water.</li>
              <li><span className="bullet">&#8226;</span> 100% payment before changing room handover.</li>
              <li><span className="bullet">&#8226;</span> Strictly different rooms for Ladies and Gents.</li>
              <li><span className="bullet">&#8226;</span> Changing Rooms are on sharing basis.</li>
              <li><span className="bullet">&#8226;</span> Do NOT keep your luggage in the room when you are doing shoot.</li>
              <li><span className="bullet">&#8226;</span> River Side Photoshoot Time will be 4:00 PM to 7:30 PM.</li>
              <li><span className="bullet">&#8226;</span> Night sets Photoshoot Time will be 7:00 PM to 09:00 PM.</li>
              <li><span className="bullet">&#8226;</span> Any Damage to property or sets need to be compensated.</li>
            </ul>
          </div>
        </div>
        <div className="modal-footer">
          <button className="accept-button" onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
