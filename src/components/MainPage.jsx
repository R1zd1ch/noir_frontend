import React from 'react';
import { Typography, Box, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import firstImage from '../assets/mainpageImg.jpg';
import secondImage from '../assets/mainpageImg2.jpg';
import {
  robotoFont,
  fadeIn,
  heroSection,
  buttonStyles,
  containerStyles,
} from './styles/MainPageStyles'; // Импорт стилей

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" minHeight="800px" sx={{ ...containerStyles }}>
      {/* Hero Section */}
      <Box
        sx={{
          ...heroSection,
          '&::before': { ...heroSection['&::before'], backgroundImage: `url(${firstImage})` },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }} style={robotoFont}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                ...robotoFont,
              }}
            >
              Noir
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontStyle: 'italic',
                mb: 4,
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                ...robotoFont,
              }}
            >
              украшения ручной работы
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={buttonStyles}
              onClick={() => navigate('/catalog')}
            >
              Перейти к каталогу
            </Button>
          </motion.div>
        </Box>
      </Box>

      {/* About Section */}
      <Box
        sx={{ py: 6, textAlign: 'center', position: 'relative', zIndex: 2 }} // Добавлены position и zIndex
        style={robotoFont}
      >
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Typography variant="h4" gutterBottom sx={robotoFont}>
            О бренде Noir
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto', mb: 4, ...robotoFont }}>
            свет и тьма в одном обличье - парадокс бытия, в котором мы пребываем...
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={buttonStyles}
            onClick={() => alert('Узнать больше')}
          >
            Узнать больше
          </Button>
        </motion.div>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          position: 'relative',
          py: 6,
          textAlign: 'center',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${secondImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)',
            zIndex: 1,
            borderRadius: '8px',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }} style={robotoFont}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Typography variant="h5" gutterBottom sx={robotoFont}>
              Готовы исследовать нашу коллекцию?
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={buttonStyles}
              onClick={() => navigate('/catalog')}
            >
              Перейти в каталог
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};

export default MainPage;
