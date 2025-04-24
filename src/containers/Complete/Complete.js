import React from "react";
import { useNavigate } from "react-router-dom";
import "./Complete.css";
import logo from '../assests/images/logo.png';
import personImage from '../assests/images/complete.png';

const CompletePose = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="camera-screen">
      {/* Header */}
      <header className="header">
        <div className="logo-section">
          <img src={logo} alt="Areta360" className="logo" />
        </div>
        <div className="header-right">
          <button className="help-button">
            <span className="help-icon">ⓘ</span>
            Help
          </button>
          <div className="language-selector">
            <span className="globe-icon">🌐</span>
            UK English
          </div>
          <div className="camera-status">
            <span className="camera-dot"></span>
            Camera On
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>

        <div className="frame-container">
          <div className="frame-box">
            <img src={personImage} alt="Person" className="person-image" />
            <div className="checkmark">✓</div>
            <div className="complete-text">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletePose;