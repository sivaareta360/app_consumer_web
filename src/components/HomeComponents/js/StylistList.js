import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // COMMENT OUT HOOK
import { IconButton } from '@mui/material';
import { 
    IoArrowBack, 
    IoHelpCircleOutline, 
    IoLanguageOutline, 
    IoChevronDown, 
    IoCalendarOutline, 
    IoChatbubbleOutline, 
    IoRibbonOutline,
    IoFlashOutline
} from 'react-icons/io5';
import '../css/StylistList.css';

import areta360Logo from '../../../assets/images/areta360.png';
import topStylistImage from '../../../assets/images/topstylist.png';
import topDesignerImage from '../../../assets/images/topdesigner.png';

const stylists = [
  {
    id: 1,
    name: 'Alexander McQueen',
    countryFlag: '🇬🇧',
    experience: 'over 14 years Exp',
    rating: 4.8,
    sessions: 338,
    reviews: 290,
    image: topDesignerImage,
    available: false,
    isTopStylist: true
  },
  {
    id: 2,
    name: 'Stella McCartney',
    countryFlag: '🇬🇧',
    experience: 'over 14 years Exp',
    rating: 4.6,
    sessions: 338,
    reviews: 290,
    image: topStylistImage,
    available: true,
    isTopStylist: true
  },
  {
    id: 3,
    name: 'Alexander McQueen',
    countryFlag: '🇬🇧',
    experience: 'over 14 years Exp',
    rating: 4.9,
    sessions: 338,
    reviews: 290,
    image: topDesignerImage,
    available: false,
    isTopStylist: true
  }
];

const StylistList = () => {
  // const navigate = useNavigate(); // COMMENT OUT HOOK
  const [activeTab, setActiveTab] = useState('all');

  const tabs = ['All', 'Stylist', 'Designer', 'Memberships'];

  const handleBack = () => {
    // navigate(-1); // COMMENT OUT USAGE
    console.log("Back button clicked (navigate disabled)");
  };

  const handleHelpClick = () => console.log('Help clicked');
  const handleLanguageClick = () => console.log('Language clicked');
  const handleFilterClick = (filter) => console.log('Filter:', filter);
  const handleLetsTalkClick = () => console.log('Lets Talk clicked');

  return (
    <div className="page-container stylist-list-page">
      <div className="header">
        <img 
          src={areta360Logo} 
          alt="Areta360" 
          className="logo" 
          // onClick={() => navigate('/')} // COMMENT OUT USAGE
        />
        <div className="header-right">
          <button className="header-button help-button" onClick={handleHelpClick}>
            <IoHelpCircleOutline size={20}/> Help
          </button>
          <button className="header-button language-button" onClick={handleLanguageClick}>
            <IoLanguageOutline size={20}/> UK English <IoChevronDown size={20}/>
          </button>
        </div>
      </div>

      <div className="sub-header-container">
        <button className="back-button" onClick={handleBack}>
          <IoArrowBack /> Back
        </button>
        <div className="tabs">
          {tabs.map(tab => (
          <button 
              key={tab}
              className={`tab ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.toLowerCase())}
          >
              {tab}
          </button>
          ))}
        </div>
      </div>

      <div className="stylist-grid">
        {stylists.map(stylist => (
          <div key={stylist.id} className="stylist-card">
            <div className="card-header">
              {stylist.isTopStylist && <span className="expert-label">TOP STYLIST</span>}
              <IoRibbonOutline className="crown-icon"/>
            </div>
            {stylist.available && (
              <div className="available-tag">
                <IoFlashOutline size={16} /> Available ASAP
              </div>
            )}
            <img 
              src={stylist.image} 
              alt={stylist.name} 
              className="stylist-image"
            />
            <div className="stylist-info">
              <h3 className="stylist-name">{stylist.name} {stylist.countryFlag}</h3>
              <p className="stylist-detail-item">
                <IoCalendarOutline size="inherit"/> {stylist.experience}
              </p>
              <p className="stylist-detail-item">
                <IoChatbubbleOutline size="inherit"/> 
                {stylist.sessions} Sessions ( {stylist.reviews} reviews )
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="filter-container">
        <button className="filter-button" onClick={() => handleFilterClick('Trending')}>Trending</button>
        <button className="filter-button" onClick={() => handleFilterClick('Top')}>Top</button>
      </div>

      <div className="bottom-talk-bar">
        <div className="user-info">
          {/* <img src={placeholderUserImage} alt="Victoria Beckham" className="user-image" /> REMOVED IMAGE */}
          <span className="user-name">victoria beckham</span>
        </div>
        <button className="lets-talk-button" onClick={handleLetsTalkClick}>
          Let's Talk
        </button>
      </div>
    </div>
  );
};

export default StylistList; 