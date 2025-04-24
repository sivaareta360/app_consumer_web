import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/common.css";
import "./CameraVerification.css";
import logo from '../assests/images/logo.png';
import personImage from '../assests/images/straightpose.png';

const CameraVerification = () => {
  const [countdown, setCountdown] = useState(10);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('UK English');
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="header">
        <div className="logo-section">
          <img src={logo} alt="Areta360" className="logo" />
        </div>
        <div className="header-controls">
          <button className="control-button">
            <span className="info-icon">ⓘ</span>
            Help
          </button>
          <div className="language-selector">
            <button 
              className="control-button"
              onClick={toggleLanguageDropdown}
            >
              <span className="globe-icon">🌐</span>
              {selectedLanguage}
              <span className="arrow-icon">▼</span>
            </button>
            {showLanguageDropdown && (
              <div className="language-dropdown">
                <button onClick={() => selectLanguage('UK English')}>UK English</button>
                <button onClick={() => selectLanguage('US English')}>US English</button>
              </div>
            )}
          </div>
          <div className="camera-status">
            <span className="camera-dot"></span>
            Camera On
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Main Content */}
      <div className="main-content">
        <div className="frame-box">
          <img src={personImage} alt="Person" className="person-image" />
          <div className="text-overlay">
            <div className="get-ready-text">Get Ready</div>
            <div className="countdown-number">{countdown}</div>
          </div>
        </div>

        {/* Instruction Box */}
        <div className="instruction-panel">
          <p>Hold or place your phone until you fit into this frame</p>
          <button className="continue-button" onClick={() => navigate("/SidePose")}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraVerification;
