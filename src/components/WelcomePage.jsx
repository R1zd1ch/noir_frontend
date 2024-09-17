import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const WelcomePage = () => {
  return (
    <Box sx={{ minHeight: '100vh', marginTop: '20px' }}>
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
