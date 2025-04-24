import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Guide.css";
import logoImage from "../assests/images/logo.png";
import correctPose from "../assests/images/Group 48095889.png";
import wrongPose from "../assests/images/Group 48095890.png";

const Guide = () => {
  const navigate = useNavigate();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('UK English');

  const handleBack = () => {
    navigate('/');
  };

  const handleContinue = () => {
    navigate("/CameraVerification");
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

  return (
    <div className="guide-container">
      <img src={logoImage} alt="Logo" className="logo" />
      <div className="header-buttons">
        <button className="help-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="white" strokeWidth="1.5"/>
            <path d="M8 11.5V8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 6V5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Help
        </button>
        <div className="language-selector">
          <button className="language-button" onClick={toggleLanguageDropdown}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1.33334C4.32 1.33334 1.33333 4.32001 1.33333 8.00001C1.33333 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00001C14.6667 4.32001 11.68 1.33334 8 1.33334Z" stroke="white" strokeWidth="1.2"/>
              <path d="M1.33333 8H14.6667" stroke="white" strokeWidth="1.2"/>
              <path d="M8 1.33334C9.84 3.36001 10.9333 5.62668 11.2 8.00001C10.9333 10.3733 9.84 12.64 8 14.6667C6.16 12.64 5.06667 10.3733 4.8 8.00001C5.06667 5.62668 6.16 3.36001 8 1.33334Z" stroke="white" strokeWidth="1.2"/>
            </svg>
            {selectedLanguage}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {showLanguageDropdown && (
            <div className="language-dropdown">
              <button onClick={() => selectLanguage('UK English')}>UK English</button>
              <button onClick={() => selectLanguage('US English')}>US English</button>
            </div>
          )}
        </div>
      </div>

      <button className="back-button" onClick={handleBack}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>

      <div className="guide-content">
        <h1 className="guide-title">How to Scan</h1>
        
        <div className="pose-examples">
          <div className="pose-card">
            <img src={correctPose} alt="Correct Pose Example" />
          </div>
          <div className="pose-card">
            <img src={wrongPose} alt="Incorrect Pose Example" />
          </div>
        </div>

        <div className="guide-section">
          <h2 className="section-title">Lighting</h2>
          <p className="guide-description">
            Ensure proper lighting for an accurate AI analysis of your body type. Good lighting helps the AI capture detailed and precise photo data, leading to better insights.
          </p>
        </div>

        <div className="button-container">
          <button className="continue-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guide;
