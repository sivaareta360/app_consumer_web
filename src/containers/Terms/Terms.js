import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Terms.css";
import logoImage from '../assests/images/logo.png';

const Terms = () => {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('UK English');

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (isAgreed) {
      navigate("/Guide");
    }
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

  return (
    <div className="terms-container">
      <div className="logo-container">
        <img src={logoImage} alt="Areta360" className="logo" />
      </div>

      <div className="header-buttons">
        <button className="header-button help-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="white" strokeWidth="1.5"/>
            <path d="M8 11.5V8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 6V5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Help
        </button>
        <div className="language-dropdown-container">
          <button className="header-button language-button" onClick={toggleLanguageDropdown}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="white" strokeWidth="1.5"/>
              <path d="M2.5 8H13.5" stroke="white" strokeWidth="1.5"/>
              <path d="M8 2.5C9.75 4.33333 10.625 6.16667 10.625 8C10.625 9.83333 9.75 11.6667 8 13.5" stroke="white" strokeWidth="1.5"/>
              <path d="M8 2.5C6.25 4.33333 5.375 6.16667 5.375 8C5.375 9.83333 6.25 11.6667 8 13.5" stroke="white" strokeWidth="1.5"/>
            </svg>
            {selectedLanguage}
            <svg className="dropdown-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {showLanguageDropdown && (
            <div className="language-dropdown">
              <button 
                className="language-option" 
                onClick={() => selectLanguage('UK English')}
              >
                <span>🇬🇧</span> UK English
              </button>
              <button 
                className="language-option" 
                onClick={() => selectLanguage('US English')}
              >
                <span>🇺🇸</span> US English
              </button>
            </div>
          )}
        </div>
      </div>

      <button className="back-button" onClick={handleBack}>
        <span className="back-icon">←</span>
        <span>Back</span>
      </button>

      <div className="content-container">
        <div className="shield-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" stroke="white" strokeWidth="1.5"/>
            <path d="M12 11V14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        <h1 className="title">
          Receive your comprehensive dress<br />
          Collection in under a minute.
        </h1>

        <p className="description">
          Areta360 takes your privacy seriously. Lear more your personal data<br />
          from this test is produced in our <a href="#" className="link">privacy policy</a>
        </p>

        <div className="agreement-section">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
            />
            <span className="agreement-text">
              I Agree To Fitwave <a href="#" className="link">Public Agreement</a>, <a href="#" className="link">Terms</a>,{" "}
              <a href="#" className="link">Privacy Policy</a>, And Confirm That I Am Over 17 Years Old
            </span>
          </label>
        </div>

        <button
          className={`continue-button ${!isAgreed ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={!isAgreed}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Terms;