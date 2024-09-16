import React from 'react';
import { Container, Typography } from '@mui/material';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';

const CartPage = () => {
  const tg = useWebApp();

  // Проверяем, доступна ли информация о пользователе
  const userId =
    tg.initDataUnsafe && tg.initDataUnsafe.user
      ? tg.initDataUnsafe.user.id
      : 'User ID not available';

  return (
    <Container maxWidth="sm" style={{ padding: '20px', textAlign: 'center', minHeight: '600px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Cart
      </Typography>
      <Typography variant="body1">User ID: {userId}</Typography>
    </Container>
  );
};

export default CartPage;
