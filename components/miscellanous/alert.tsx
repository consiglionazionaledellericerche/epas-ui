import React from 'react';

const alertStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1050,
  width: '300px',
  margin: '0 auto'
};

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert alert-danger alert-dismissible fade show" style={alertStyles} role="alert">
      {message}
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

export default Alert;
