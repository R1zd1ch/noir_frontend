import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import Slider from 'react-slick';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const styles = {
  modalContainer: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // 100% width for mobile
    height: 'auto', // Set height to auto to adjust to content
    bgcolor: 'rgba(0, 0, 0, 0.5)',
    boxShadow: 24,
    outline: 'none',
  },
  closeButton: {
    position: 'absolute',
    top: -20,
    right: -10,
    zIndex: 10,
    fontSize: '1.2rem', // Reduced size for mobile
    bgcolor: 'white',
  },
  modalImageContainer: {
    textAlign: 'center',
  },
  modalImage: {
    maxWidth: '100%', // Full width
    height: 'auto', // Auto height to maintain aspect ratio
    objectFit: 'contain', // Fit image without distortion
  },
  prevArrow: {
    position: 'absolute',
    top: '50%',
    left: -10,
    zIndex: 10,
    fontSize: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  },
  nextArrow: {
    position: 'absolute',
    top: '50%',
    right: -10,
    zIndex: 10,
    fontSize: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  },
};

const ImageModal = ({ open, images, onClose, initialSlide = 0 }) => {
  const sliderSettings = {
    dots: true,
    infinite: false, // Disable infinite scrolling to avoid duplication
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalContainer}>
        <IconButton sx={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <Box key={index} sx={styles.modalImageContainer}>
              <img src={image.url} alt={`Jewelry image ${index}`} style={styles.modalImage} />
            </Box>
          ))}
        </Slider>
      </Box>
    </Modal>
  );
};

const CustomPrevArrow = ({ onClick }) => {
  return (
    <IconButton sx={styles.prevArrow} onClick={onClick}>
      <ArrowBackIcon />
    </IconButton>
  );
};

const CustomNextArrow = ({ onClick }) => {
  return (
    <IconButton sx={styles.nextArrow} onClick={onClick}>
      <ArrowForwardIcon />
    </IconButton>
  );
};

export default ImageModal;
