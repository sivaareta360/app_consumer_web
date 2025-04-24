import React, { useState } from 'react';
import { Tabs, Tab, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CollectionCard from './CollectionCard.js';
import '../css/Collections.css';

// Import assets
import areta360Logo from '../../../assets/images/areta360.png';
import cartIcon from '../../../assets/icon/cart-icon.png';
import notificationIcon from '../../../assets/icon/notification (1).png';
import historyIcon from '../../../assets/icon/history-icon.png';
import image1 from '../../../assets/images/1.png';
import image2 from '../../../assets/images/2.png';
import image3 from '../../../assets/images/3.png';
import image4 from '../../../assets/images/4.png';
import image5 from '../../../assets/images/5.png';
import image6 from '../../../assets/images/6.png';
import image7 from '../../../assets/images/7.png';
import image8 from '../../../assets/images/8.png';
import style1 from '../../../assets/images/style1.png';
import style2 from '../../../assets/images/style2.png';
import style3 from '../../../assets/images/style3.png';
import style4 from '../../../assets/images/style4.png';
import style5 from '../../../assets/images/style5.png';
import style6 from '../../../assets/images/style6.png';

const Collections = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const collections = [
    {
      id: 1,
      image: image1,
      category: 'Casual'
    },
    {
      id: 2,
      image: image2,
      category: 'Casual'
    },
    {
      id: 3,
      image: image3,
      category: 'Casual'
    },
    {
      id: 4,
      image: image4,
      category: 'Casual'
    },
    {
      id: 5,
      image: image5,
      category: 'Casual'
    },
    {
      id: 6,
      image: image6,
      category: 'Casual'
    },
    {
      id: 7,
      image: image7,
      category: 'Casual'
    },
    {
      id: 8,
      image: image8,
      category: 'Casual'
    },
    {
      id: 9,
      image: style1,
      category: 'Formal'
    },
    {
      id: 10,
      image: style2,
      category: 'Formal'
    },
    {
      id: 11,
      image: style3,
      category: 'Formal'
    },
    {
      id: 12,
      image: style4,
      category: 'Formal'
    },
    {
      id: 13,
      image: style5,
      category: 'Formal'
    },
    {
      id: 14,
      image: style6,
      category: 'Formal'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCollectionClick = (collection) => {
    navigate(`/look/${collection.id}`);
  };

  const filteredCollections = () => {
    switch (activeTab) {
      case 0: // YOURS
        return collections.filter(c => c.id <= 8); // Show numbered images
      case 1: // TRENDING
        return collections.filter(c => c.id > 8); // Show style images
      case 2: // ALL COLLECTIONS
        return collections;
      default:
        return collections;
    }
  };

  return (
    <div className="page-container">
      <header className="header">
        <div className="logo-container">
          <img 
            className="logo" 
            src={areta360Logo} 
            alt="Areta360" 
            onClick={() => navigate('/')} 
          />
          <h1 className="title">Collections</h1>
        </div>
        <div className="icons-container">
          <IconButton>
            <img src={cartIcon} alt="Cart" />
          </IconButton>
          <IconButton>
            <img src={notificationIcon} alt="Notifications" />
          </IconButton>
          <IconButton>
            <img src={historyIcon} alt="History" />
          </IconButton>
        </div>
      </header>
      <div className="tabs-container">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="standard"
          className="custom-tabs"
        >
          <Tab label="YOURS" className="custom-tab" />
          <Tab label="TRENDING" className="custom-tab" />
          <Tab label="ALL COLLECTIONS" className="custom-tab" />
        </Tabs>
      </div>
      <div className="collections-grid">
        {filteredCollections().map((collection) => (
          <CollectionCard
            key={collection.id}
            image={collection.image}
            category={collection.category}
            onClick={() => handleCollectionClick(collection)}
          />
        ))}
      </div>
    </div>
  );
};

export default Collections; 