import React, { useEffect, useMemo } from 'react';
import { Box, Typography, Button, CircularProgress, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import welcomePageStyles from './styles/WelcomePageStyles'; // Импортируем стили
import backgroundImage from '../assets/welcomePageIphone.png';
const WelcomePage = () => {
  // Данные пользователя из хранилища
  const { loading, error, user } = useSelector((state) => state.user);

  // Лоадер при загрузке данных
  if (loading) {
    return (
      <Box sx={welcomePageStyles.loaderContainer}>
        <CircularProgress size={80} />
      </Box>
    );
  }

  // Ошибка при загрузке данных
  if (error) {
    const { message, statusCode } = error;
    return (
      <Box sx={welcomePageStyles.errorContainer}>
        <p>Error: {message || 'An unknown error occurred'}</p>
        {statusCode && <p>Status Code: {statusCode}</p>}
      </Box>
    );
  }

  // Отображение страницы с данными пользователя из хранилища или Telegram API
  return (
    <Box sx={welcomePageStyles.pageContainer}>
      <Box sx={welcomePageStyles.contentContainer}>
        <Container sx={welcomePageStyles.mainContent}>
          <Typography variant="h2" gutterBottom sx={welcomePageStyles.textStyle}>
            Добро пожаловать!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={welcomePageStyles.joinButton}
            href="https://vk.com/noir_jewelry"
            target="_blank"
            rel="noopener"
          >
            Перейти в группу ВКонтакте
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default WelcomePage;
