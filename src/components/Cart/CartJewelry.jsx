import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';

const styles = {
  card: {
    height: '100%',
    backgroundColor: '#212121',
    color: '#FFFFFF',
    position: 'relative',
  },
  media: {
    objectFit: 'cover',
  },
  content: {
    height: '180px',
    overflow: 'hidden',
  },
  title: {
    whiteSpace: 'normal',
  },
  descriptionBox: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    color: 'white',
  },
  price: {
    color: 'primary',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    padding: '0 20px',
    height: '60px',
  },
  button: {
    color: '#FF0000',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

const CartJewelry = ({ item, onRemove }) => {
  const { jewelry } = item; // Деструктурируем jewelry для удобства

  return (
    <Card sx={styles.card}>
      {jewelry.images.length > 0 && (
        <CardMedia
          component="img"
          height="200"
          image={jewelry.images[0].url}
          alt={jewelry.title}
          sx={styles.media}
        />
      )}
      <CardContent sx={styles.content}>
        <Typography variant="h5" component="div" sx={styles.title}>
          {jewelry.title}
        </Typography>
        <Box sx={styles.descriptionBox}>
          <Typography variant="body2">{jewelry.description}</Typography>
        </Box>
        <Typography variant="h6" sx={styles.price}>
          ${jewelry.price.toFixed(2)}
        </Typography>
      </CardContent>
      <Box sx={styles.buttonContainer}>
        <Button
          onClick={() => onRemove(jewelry.id)} // Предполагаем, что jewelryId это id в jewelry
          sx={styles.button}
        >
          Удалить из корзины
        </Button>
      </Box>
    </Card>
  );
};

export default CartJewelry;
