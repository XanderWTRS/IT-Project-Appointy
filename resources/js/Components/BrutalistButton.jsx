import React from 'react';
import '../../css/BrutalistButton.css'; // Adjust based on actual folder structure

const BrutalistButton = ({ text = 'MXS', subtext = 'Get it from' }) => {
  const logoPath = `${process.env.PUBLIC_URL}/assets/img/download.png`;

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
