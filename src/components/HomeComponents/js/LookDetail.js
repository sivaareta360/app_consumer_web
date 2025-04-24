import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconButton, CircularProgress } from '@mui/material';
import '../css/LookDetail.css';
// Import the shared popup CSS (if not already imported globally or via LookDetail.css)
// Assuming ExpertPopup.css needs to be imported if not already covered.
import '../../../styles/ExpertPopup.css'; 

// Import the ExpertPopup component
import ExpertPopup from './ExpertPopup.js';

// COMMENT OUT MUI ICONS IMPORTS
// import CropIcon from '@mui/icons-material/Crop';
// import TuneIcon from '@mui/icons-material/Tune';
// import GridOnIcon from '@mui/icons-material/GridOn';
// import StraightenIcon from '@mui/icons-material/Straighten';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import CloseIcon from '@mui/icons-material/Close';
// import { default as SearchIcon } from '@mui/icons-material/Search';

// Import assets with corrected paths
import areta360Logo from '../../../assets/images/areta360.png';
import cartIcon from '../../../assets/icon/cart-icon.png';
import starIcon from '../../../assets/icon/star.png';
import bagIcon from '../../../assets/icon/bag.png';
import toolsIcon from '../../../assets/icon/tools.png';
import collarIcon from '../../../assets/icon/collar.png';
import stylesIcon from '../../../assets/icon/styles.png';
import pantIcon from '../../../assets/icon/pant.png';
import coatIcon from '../../../assets/icon/coat.png';
import heartIcon from '../../../assets/icon/heart.png';
import cameraIcon from '../../../assets/icon/camera.png';
import searchIconPng from '../../../assets/icon/search.png';
import whiteModelImage from '../../../assets/images/white dress model (1).png';
import style1Image from '../../../assets/images/style1.png';
import style2Image from '../../../assets/images/style2.png';
import style3Image from '../../../assets/images/style3.png';
import style4Image from '../../../assets/images/style4.png';
import style5Image from '../../../assets/images/style5.png';
import style6Image from '../../../assets/images/style6.png';
import axios from 'axios';

// Import the static tool images
import t11Icon from '../../../assets/icon/t11.png';
import t22Icon from '../../../assets/icon/t22.png';
import t33Icon from '../../../assets/icon/t33.png';
import t44Icon from '../../../assets/icon/t44.png';
import t55Icon from '../../../assets/icon/t55.png';
import t66Icon from '../../../assets/icon/t66.png';

// Define the tools array (using placeholders now)
const toolsArray = [
  { id: 'crop', imageSrc: t11Icon, label: 'Crop' },
  { id: 'adjust', imageSrc: t22Icon, label: 'Adjust' },
  { id: 'grid', imageSrc: t33Icon, label: 'Grid' },
  { id: 'ruler', imageSrc: t44Icon, label: 'Ruler' },
  { id: 'price', imageSrc: t55Icon, label: 'Price' },
  { id: 'close', imageSrc: t66Icon, label: 'Close' }
];

const LookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeTab, setActiveTab] = useState('accessories');
  const [activeCategory, setActiveCategory] = useState('collar');
  const [showExpertPopup, setShowExpertPopup] = useState(false);
  const [selectedMainTool, setSelectedMainTool] = useState(null);
  const [activeFooterStyle, setActiveFooterStyle] = useState(null);
  const [displayImage, setDisplayImage] = useState(whiteModelImage);
  const [isLoading, setIsLoading] = useState(false);
  const [currentObjectURL, setCurrentObjectURL] = useState(null);

  const sizes = ['M', 'L', 'XL', 'XXL', '3XL'];

  const styleOptions = [
    {
      id: 1,
      image: style1Image,
      name: 'Basic jumpers',
      category: 'Summer'
    },
    {
      id: 2,
      image: style2Image,
      name: 'Warm puffer',
      category: 'Summer'
    },
    {
      id: 3,
      image: style3Image,
      name: 'Bomber',
      category: 'Summer'
    },
    {
      id: 4,
      image: style4Image,
      name: 'Biker jacket',
      category: 'Summer'
    },
    {
      id: 5,
      image: style5Image,
      name: 'Summer Style',
      category: 'Summer'
    },
    {
      id: 6,
      image: style6Image,
      name: 'Casual Look',
      category: 'Summer'
    }
  ];

  useEffect(() => {
    return () => {
      if (currentObjectURL) {
        URL.revokeObjectURL(currentObjectURL);
      }
    };
  }, [currentObjectURL]);

  const handleStyleClick = async (garmentImageUrl) => {
    if (isLoading) return;
    console.log("handleStyleClick triggered for garment:", garmentImageUrl);
    setIsLoading(true);
    console.log("Attempting to fetch person image from displayImage:", displayImage);
    
    let previousVtonUrl = null; 
    if (displayImage.startsWith('blob:')) {
        previousVtonUrl = currentObjectURL; 
    }

    try {
      const personImageResponse = await fetch(displayImage);
      console.log("Person image fetch response status:", personImageResponse.status);
      if (!personImageResponse.ok) {
        throw new Error(`Failed to fetch person image: ${personImageResponse.statusText}`);
      }
      const garmentImageResponse = await fetch(garmentImageUrl);
      console.log("Garment image fetch response status:", garmentImageResponse.status);
      if (!garmentImageResponse.ok) {
        throw new Error(`Failed to fetch garment image: ${garmentImageResponse.statusText}`);
      }
      const personImageBlob = await personImageResponse.blob();
      const garmentImageBlob = await garmentImageResponse.blob();
      console.log("Blobs created successfully.");

      const formData = new FormData();
      formData.append('person_image', personImageBlob, 'person.jpg'); 
      formData.append('garment_image', garmentImageBlob, 'garment.jpg');
      console.log("FormData prepared, sending to VTON API...");

      const response = await axios.post(
        'http://localhost:3000/vton',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          responseType: 'blob'
        }
      );
      console.log("VTON API response received, status:", response.status);

      if (previousVtonUrl) { 
          console.log("Revoking previous VTON/uploaded URL:", previousVtonUrl);
          URL.revokeObjectURL(previousVtonUrl);
      }
      
      const newObjectURL = URL.createObjectURL(response.data);
      console.log("Created new VTON result URL:", newObjectURL);
      setCurrentObjectURL(newObjectURL);
      setDisplayImage(newObjectURL);

    } catch (error) {
      console.error('Error during VTON process inside handleStyleClick:', error);
    } finally {
      console.log("handleStyleClick finished.");
      setIsLoading(false);
    }
  };

  const handleStarClick = () => {
    setShowExpertPopup(true);
  };

  const handleOpenExpertPopup = (styleName) => {
    setShowExpertPopup(true);
  };
  
  const handleHeartClick = (e) => {
    e.stopPropagation();
    console.log("Heart clicked");
  };

  const handleMainToolClick = (toolId) => {
    if (toolId === 'close') {
      navigate('/'); 
    } else {
      setSelectedMainTool(toolId === selectedMainTool ? null : toolId);
    }
  };

  const handleCameraButtonClick = () => {
    console.log("Camera button clicked, triggering input...");
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event) => {
    console.log("File input changed:", event.target.files);
    const file = event.target.files?.[0];
    if (file) {
      if (currentObjectURL) {
        console.log("Revoking previous URL:", currentObjectURL);
        URL.revokeObjectURL(currentObjectURL);
      }
      const newObjectURL = URL.createObjectURL(file);
      console.log("Created new URL for uploaded file:", newObjectURL);
      setCurrentObjectURL(newObjectURL);
      setDisplayImage(newObjectURL);
    }
    if (event.target) {
      event.target.value = null;
    }
  };

  return (
    <div className="page-container">
      <header className="header">
        <img 
          className="logo" 
          src={areta360Logo} 
          alt="Areta360" 
          onClick={() => navigate('/')} 
        />
        <IconButton className="cart-button">
          <img src={cartIcon} alt="Cart" />
        </IconButton>
      </header>

      <div className="main-content">
        <div className="main-image-section">
          {isLoading && (
            <div className="loading-overlay">
              <CircularProgress color="inherit" />
            </div>
          )}
          <div className="action-buttons-container">
            <IconButton className="image-star-button" onClick={handleStarClick}>
              <img src={starIcon} alt="Star" />
            </IconButton>
            <IconButton className="image-heart-button" onClick={handleHeartClick}>
              <img src={heartIcon} alt="Heart" />
            </IconButton>
            <IconButton className="image-camera-button" onClick={handleCameraButtonClick}>
              <img src={cameraIcon} alt="Camera" />
            </IconButton>
          </div>
          <img className="main-image" src={displayImage} alt="Look" />
          <div className="image-counter">Look | 1/4</div>
          <input 
            type="file"
            accept="image/png, image/jpeg, image/*"
            ref={fileInputRef}
            style={{ display: 'none' }} 
            onChange={handleImageUpload}
          />
        </div>

        {activeTab === 'accessories' ? (
          <div className="size-bar-container"> 
            <div className="size-label">Size: {selectedSize}</div>
            <div className="size-buttons">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="main-tools-bar"> 
            <div className="main-tools-label">Tools</div> 
            {toolsArray.map((tool) => (
              <button
                key={tool.id}
                className={`tool-button ${selectedMainTool === tool.id ? 'active' : ''}`}
                onClick={() => handleMainToolClick(tool.id)}
                title={tool.label}
              >
                <img src={tool.imageSrc} alt={tool.label} style={{ width: '24px', height: '24px' }} /> 
              </button>
            ))}
          </div>
        )}

        <div className="tools-section">
          <div className="tools-header">
            <h2 className="tools-title">
              <img className="tools-icon" src={toolsIcon} alt="Tools" />
              Choose and apply
            </h2>
          </div>

          <div className="controls-container">
            <div className="header-tab-buttons">
              <button
                className={`accessories-button ${activeTab === 'accessories' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('accessories');
                }}
              >
                <img src={bagIcon} alt="Accessories" />
                <span>Accessories</span>
              </button>
              <button
                className={`tools-button ${activeTab === 'tools' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('tools');
                }}
              >
                <img src={toolsIcon} alt="Tools" />
                <span>Tools</span>
              </button>
            </div>

            <hr className="controls-divider" />

            <div className="category-bar">
              <button
                className={`category-button ${activeCategory === 'collar' ? 'active' : ''}`}
                onClick={() => setActiveCategory('collar')}
              >
                <img src={collarIcon} alt="" />
                <span>Collar</span>
              </button>
              <button
                className={`category-button ${activeCategory === 'styles' ? 'active' : ''}`}
                onClick={() => setActiveCategory('styles')}
              >
                <img src={stylesIcon} alt="" />
                <span>Styles</span>
              </button>
              <button
                className={`category-button ${activeCategory === 'pant' ? 'active' : ''}`}
                onClick={() => setActiveCategory('pant')}
              >
                <img src={pantIcon} alt="" />
                <span>Pant</span>
              </button>
              <button
                className={`category-button ${activeCategory === 'coat' ? 'active' : ''}`}
                onClick={() => setActiveCategory('coat')}
              >
                <img src={coatIcon} alt="" />
                <span>Coat</span>
              </button>
            </div>
          </div>

          <div className="style-grid">
            {styleOptions.map((style) => (
              <div 
                key={style.id} 
                className={`style-card ${isLoading ? 'disabled' : ''}`}
                role="button"
                tabIndex={isLoading ? -1 : 0}
                onClick={() => !isLoading && handleStyleClick(style.image)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleStyleClick(style.image)}
              >
                <img className="style-image" src={style.image} alt={style.name} />
                <div className="style-info">
                  <div className="style-name">{style.name}</div>
                  <div className="style-category">{style.category}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="tools-footer">
            <div className="footer-style-names-scroll">
              {styleOptions.map((style) => (
                <button 
                  key={style.id} 
                  className={`footer-style-name ${activeFooterStyle === style.name ? 'active' : ''}`}
                  onClick={() => setActiveFooterStyle(style.name)}
                >
                  {style.name}
                </button>
              ))}
            </div>
            <IconButton className="search-icon-button">
              <img src={searchIconPng} alt="Search" style={{ width: '24px', height: '24px' }} />
            </IconButton>
          </div>

        </div>
      </div>

      <ExpertPopup 
        isOpen={showExpertPopup}
        onClose={() => setShowExpertPopup(false)}
        navigate={navigate}
      />
    </div>
  );
};

export default LookDetail; 