import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import '../css/CollectionCard.css';

const CollectionCard = ({ image, category, onClick }) => {
  return (
    <div className="collection-card" onClick={onClick}>
      <img className="collection-image" src={image} alt={category} />
      <div className="collection-overlay">
        <div className="category-badge">{category}</div>
      </div>
    </div>
  );
};

export default CollectionCard; 