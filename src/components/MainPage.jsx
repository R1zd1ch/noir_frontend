import React from 'react';
import { Typography, Box, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Импорт framer-motion
import firstImage from '../assets/mainpageImg.jpg';
import secondImage from '../assets/mainpageImg2.jpg';

// CSS стиль для подключения шрифта Roboto
const robotoFont = {
  fontFamily: '"Roboto", sans-serif',
};

// Определение анимаций
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } }, // 1 секунда плавного появления
};

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      {/* Hero Section - Главный баннер */}
      <Box
        sx={{
          position: 'relative',
          padding: '120px 0',
          textAlign: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${firstImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)',
            zIndex: 1,
          },
        }}
      >
        {/* Контент поверх затемненного фона */}
        <Box sx={{ position: 'relative', zIndex: 2 }} style={robotoFont}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                ...robotoFont, // Применение шрифта
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
                ...robotoFont, // Применение шрифта
              }}
            >
              украшения ручной работы
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#000', // Черный фон
                color: '#fff', // Белый текст
                borderRadius: 4,
                padding: '10px 20px',
                '&:hover, &:active': {
                  backgroundColor: '#333', // Темно-серый при нажатии (для сенсорных экранов)
                },
                '&:focus': {
                  outline: 'none',
                },
                ...robotoFont, // Применение шрифта
              }}
              onClick={() => navigate('/catalog')}
            >
              Перейти к каталогу
            </Button>
          </motion.div>
        </Box>
      </Box>

      {/* About Section - Описание бренда */}
      <Box sx={{ py: 6, textAlign: 'center' }} style={robotoFont}>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ ...robotoFont }} // Применение шрифта
          >
            О бренде Noir
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto', mb: 4, ...robotoFont }}>
            свет и тьма в одном обличье - парадокс бытия, в котором мы пребываем...
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#000', // Черная рамка
              color: '#000', // Черный текст
              borderRadius: 4,
              padding: '10px 20px',
              '&:hover, &:active': {
                borderColor: '#333',
                color: '#333',
              },
              ...robotoFont, // Применение шрифта
            }}
            onClick={() => alert('Узнать больше')}
          >
            Узнать больше
          </Button>
        </motion.div>
      </Box>

      {/* Call to Action Section - Призыв к действию */}
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
            <Typography variant="h5" component="h3" gutterBottom sx={{ ...robotoFont }}>
              Готовы исследовать нашу коллекцию?
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#000', // Черный фон кнопки
                color: '#fff', // Белый текст
                borderRadius: 4,
                padding: '10px 20px',
                '&:hover, &:active': {
                  backgroundColor: '#333', // Темно-серый при нажатии
                },
                ...robotoFont, // Применение шрифта
              }}
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
