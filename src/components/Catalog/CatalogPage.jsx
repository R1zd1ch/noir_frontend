import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress, Typography, Box, Pagination, Button } from '@mui/material';
import { fetchJewelryItems, resetStatus } from '../../slices/JewelrySlice';
import JewelryCard from './JewelryCard';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items: jewelryItems, status, error } = useSelector((state) => state.jewelry);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Количество товаров на странице

  // Фильтрация и сортировка товаров
  const availableJewelryItems = Array.isArray(jewelryItems)
    ? jewelryItems.filter((item) => item.quantity > 0) // Товары с количеством больше 0
    : [];

  const unavailableJewelryItems = Array.isArray(jewelryItems)
    ? jewelryItems.filter((item) => item.quantity === 0 || item.quantity == null) // Товары с количеством 0 или неуказанным
    : [];

  const sortedJewelryItems = [...availableJewelryItems, ...unavailableJewelryItems];

  // Пагинация
  const totalPages = Math.ceil(sortedJewelryItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJewelryItems = sortedJewelryItems.slice(indexOfFirstItem, indexOfLastItem);

  // Эффект для загрузки данных
  useEffect(() => {
    // Сбрасываем статус перед новой загрузкой данных
    dispatch(resetStatus());
    dispatch(fetchJewelryItems());
  }, [dispatch]);

  // Эффект для сброса ошибки при повторной попытке
  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(resetStatus()); // Сбрасываем ошибку после успешной загрузки данных
    }
  }, [status, dispatch]);

  if (status === 'loading') {
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

  if (error && status !== 'succeeded') {
    return (
      <Box
        sx={{
          minHeight: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography color="white">Ошибка: {error}</Typography>
        <Typography color="white">Чтобы сообщить об ошибке и поныть</Typography>
        <Typography color="white" align="center">
          Нажмите на&nbsp;
          <Button
            variant="contained"
            color="primary"
            href="https://t.me/r1zzd"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ marginLeft: 1 }}
          >
            Пожаловаться
          </Button>
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: 2 }}
          onClick={() => dispatch(fetchJewelryItems())}
        >
          Повторить загрузку
        </Button>
      </Box>
    );
  }

  if (currentJewelryItems.length === 0 && status !== 'loading') {
    return (
      <Box sx={{ minHeight: '550px', marginTop: '50px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: 2,
          }}
        >
          <Typography color="white" variant="h6">
            Нет доступных украшений для отображения
          </Typography>
        </Box>
      </Box>
    );
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ minHeight: '808px', padding: 2 }}>
      <Box sx={{ minHeight: '808px' }}>
        <Typography color="white" variant="h2" align="center" paddingBottom={2}>
          Наши украшения:
        </Typography>
        <Grid container spacing={1}>
          {currentJewelryItems.map((jewelry) => (
            <Grid item key={jewelry.id} xs={6} sm={3} md={3} lg={3}>
              <JewelryCard jewelry={jewelry} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CatalogPage;
