import React, { useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { fetchUser } from '../slices/userSlice.js'; // Import the slice

const WelcomePage = () => {
  const dispatch = useDispatch();
  const tg = useWebApp();

  // Select loading, error, and user from Redux state
  const { loading, error, user } = useSelector((state) => state.user);

  // Use the Telegram init data, or fallback to default values
  const telegramId = tg.initDataUnsafe?.user?.id.toString() || '6933164806';
  const userName = tg.initDataUnsafe?.user?.first_name || 'r1zzd';

  // Fetch user data when component mounts
  useEffect(() => {
    if (telegramId) {
      dispatch(fetchUser(telegramId));
    }
  }, [dispatch, telegramId]);
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
  if (error) return <p>Error: {error}</p>;

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
          Привет, {user?.firstName || userName}!!!
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
