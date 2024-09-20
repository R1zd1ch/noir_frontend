import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';

const CartJewelry = ({ item, onRemove }) => {
  return (
    <Card
      sx={{
        height: '100%',
        backgroundColor: '#212121',
        color: '#FFFFFF',
        position: 'relative',
      }}
    >
      {item.jewelry.images.length > 0 && (
        <CardMedia
          component="img"
          height="200"
          image={item.jewelry.images[0].url}
          alt={item.jewelry.title}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ height: '180px', overflow: 'hidden' }}>
        <Typography variant="h5" component="div" sx={{ whiteSpace: 'normal' }}>
          {item.jewelry.title}
        </Typography>
        <Box
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            color: 'white',
          }}
        >
          <Typography variant="body2">{item.jewelry.description}</Typography>
        </Box>
        <Typography variant="h6" color="primary">
          ${item.jewelry.price.toFixed(2)}
        </Typography>
      </CardContent>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 'auto',
          padding: '0 20px',
          height: '60px',
        }}
      >
        <Button
          onClick={() => onRemove(item.jewelryId)}
          sx={{
            color: '#FF0000',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Удалить из корзины
        </Button>
      </Box>
    </Card>
  );
};

export default CartJewelry;
