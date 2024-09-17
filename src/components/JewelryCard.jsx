import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const JewelryCard = ({ jewelry }) => {
  return (
    <Card sx={{ height: '100%', backgroundColor: '#212121', color: '#FFFFFF' }}>
      {jewelry.images.length > 0 && (
        <CardMedia
          component="img"
          height="200"
          image={jewelry.images[0].url}
          alt={jewelry.title}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div" sx={{ whiteSpace: 'normal' }}>
          {jewelry.title}
        </Typography>
        <Box
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3, // Ограничиваем до 3 строк
            color: 'white',
          }}
        >
          <Typography variant="body2">{jewelry.description}</Typography>
        </Box>
        <Typography variant="h6" color="primary">
          ${jewelry.price.toFixed(2)}
        </Typography>
        {jewelry.sold && (
          <Typography variant="body2" color="error">
            Продано
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default JewelryCard;
