import React, { useEffect, useMemo } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { fetchUser } from '../slices/userSlice.js'; // Импортируем экшен

const WelcomePage = () => {
  const dispatch = useDispatch();
  const tg = useWebApp();

  // Select loading, error, and user from Redux state
  const { loading, error, user } = useSelector((state) => state.user);

  // Извлекаем данные пользователя из tg.initDataUnsafe
  const telegramIdNotToString = tg.initDataUnsafe?.user?.id;
  const telegramId = telegramIdNotToString.telegramIdNot.ToString() || '6933164806';
  const username = tg.initDataUnsafe?.user?.username || 'r1zzd';
  const firstName = tg.initDataUnsafe?.user?.first_name || 'r1zzd';
  const lastName = tg.initDataUnsafe?.user?.last_name || '';
  const languageCode = tg.initDataUnsafe?.user?.language_code || 'ru';
  const isBot = tg.initDataUnsafe?.user?.is_bot || false;

  // Memoize userData to avoid unnecessary re-renders
  const userData = useMemo(
    () => ({
      telegramId,
      username,
      firstName,
      lastName,
      languageCode,
      isBot,
    }),
    [telegramId, username, firstName, lastName, languageCode, isBot],
  );

  // Отправляем данные пользователя при монтировании компонента
  useEffect(() => {
    if (telegramId) {
      dispatch(fetchUser(userData)); // Передаем данные пользователя
    }
  }, [dispatch, telegramId, userData]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '600px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (error) {
    const { message, statusCode } = error;
    return (
      <Box sx={{ color: 'red' }}>
        <p>Error: {message || 'An unknown error occurred'}</p>
        {statusCode && <p>Status Code: {statusCode}</p>}
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', marginTop: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography color="white" align="center">
          Привет, {user?.firstName || firstName}!!!
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#48494a',
          color: 'white',
          padding: 3,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Добро пожаловать в Noir Jewelry!
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          Мы создаём уникальные украшения, которые подчёркивают вашу индивидуальность.
          Присоединяйтесь к нашему сообществу во ВКонтакте, чтобы быть в курсе новинок!
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: 3 }}
          href="https://vk.com/noir_jewelry" // Ссылка на группу ВКонтакте
          target="_blank"
          rel="noopener"
        >
          Перейти в группу ВКонтакте
        </Button>
      </Box>
    </Box>
  );
};

export default WelcomePage;
