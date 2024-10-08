import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import cartJewelryStyles from './styles/CartJewelryStyles'; // Импорт стилей

const CartJewelry = ({ item, onRemove }) => {
  const { jewelry } = item; // Деструктурируем jewelry для удобства

  return (
    <Card sx={cartJewelryStyles.card}>
      {jewelry.images.length > 0 && (
        <CardMedia
          component="img"
          height="200"
          image={jewelry.images[0].url}
          alt={jewelry.title}
          sx={cartJewelryStyles.media}
        />
      )}
      <CardContent sx={cartJewelryStyles.content}>
        <Typography variant="h5" component="div" sx={cartJewelryStyles.title}>
          {jewelry.title}
        </Typography>
        <Box sx={cartJewelryStyles.descriptionBox}>
          <Typography variant="body2">{jewelry.description}</Typography>
        </Box>
        <Typography variant="h6" sx={cartJewelryStyles.price}>
          ${jewelry.price.toFixed(2)}
        </Typography>
      </CardContent>
      <Box sx={cartJewelryStyles.buttonContainer}>
        <Button onClick={() => onRemove(jewelry.id)} sx={cartJewelryStyles.button}>
          Удалить из корзины
        </Button>
      </Box>
    </Card>
  );
};

export default CartJewelry;
