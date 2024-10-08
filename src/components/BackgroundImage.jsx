import React from 'react';
import { Box } from '@mui/material';
import backgroundImage from '../assets/fon.jpg';

const BackgroundImage = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`, // URL вашего изображения
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
        filter: 'brightness(50%)', // Для затемнения
      }}
    />
  );
};

export default BackgroundImage;
