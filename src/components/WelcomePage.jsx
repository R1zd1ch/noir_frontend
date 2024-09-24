import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../slices/userSlice'; // Import the slice
import { useWebApp } from '@vkruglikov/react-telegram-web-app';

const WelcomePage = () => {
  const dispatch = useDispatch();
  // Replace this with the actual telegram ID you want to fetch
  const tg = useWebApp();
  const telegramId = tg.initDataUnsafe?.user?.id.toString() || '6933164806';
  const userName = tg.initDataUnsafe?.user?.first_name || 'r1zzd';
  useEffect(() => {
    // Dispatch fetchUser to load the user data
    dispatch(fetchUser(telegramId));
  }, [dispatch, telegramId]);

  return (
    <Box sx={{ minHeight: '100vh', marginTop: '20px' }}>
      <Box
        sx={{
          minHeight: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography color="white" align="center">
          Привет, {userName}!!!
        </Typography>
      </Box>
      <Box
        sx={{
          minHeight: '',
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
