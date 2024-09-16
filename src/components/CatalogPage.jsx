import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { fetchJewelryItems } from '../slices/JewelrySlice';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items: jewelryItems, status, error } = useSelector((state) => state.jewelry);

  // Загружаем товары при монтировании компонента
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJewelryItems());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography sx={{ minHeight: '600px' }} color="error">
        Ошибка: {error}
      </Typography>
    );
  }

  // Проверяем, что jewelryItems - массив
  const jewelryList = Array.isArray(jewelryItems) ? jewelryItems : [];

  return (
    <Box sx={{ minHeight: '600px' }}>
      <Grid container spacing={4} sx={{ padding: 4 }}>
        {jewelryList.map((jewelry) => (
          <Grid item key={jewelry.id} xs={12} sm={6} md={4}>
            <Card>
              {jewelry.images.length > 0 && (
                <CardMedia
                  component="img"
                  height="200"
                  image={jewelry.images[0].url} // Используем первое изображение украшения
                  alt={jewelry.title}
                />
              )}
              <CardContent>
                <Typography variant="h5" component="div">
                  {jewelry.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {jewelry.description}
                </Typography>
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CatalogPage;
