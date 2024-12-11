import React from 'react';
import '../../css/BrutalistButton.css';

const BrutalistButton = ({ text = 'MXS', subtext = 'Get it from' }) => {
  const logoPath = '/Assets/MaxelixSolutions/LOGO-icon.png';

  return (
    <button className="brutalist-button">
      <div className="ms-logo">
        <img src={logoPath} alt="Logo" className="ms-logo-image" />
      </div>
      <div className="button-text">
        <span>{subtext}</span>
        <span>{text}</span>
      </div>
    </button>
  );
};

export default BrutalistButton;
