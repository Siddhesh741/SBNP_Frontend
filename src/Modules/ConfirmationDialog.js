import React, { useState } from 'react';
import './ConfirmationDialog.css'; // Import CSS file for styling

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleConfirm = async () => {
        await onConfirm();
        setShowSuccessMessage(true);
    };
//Confirmation Popup used in Deleted Client successfully from Booking table
    return (
        <div className="confirmation-dialog-container">
            <div className="confirmation-dialog">
                <div className="confirmation-dialog-message">
                    <p>{message}</p>
                </div>
                <div className="confirmation-dialog-buttons">
                    <button className="cancel-button" onClick={onCancel}>Cancel</button>
                    <button className="confirm-button" onClick={handleConfirm}>OK</button>
                </div>
            </div>
            {showSuccessMessage && (
                <div className="success-message1">
                    <p>Client successfully deleted!</p>
                </div>
            )}
        </div>
    );
};

export default ConfirmationDialog;
