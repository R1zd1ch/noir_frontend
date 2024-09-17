import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress, Typography, Box, Pagination } from '@mui/material';
import { fetchJewelryItems, resetStatus } from '../slices/JewelrySlice';
import JewelryCard from './JewelryCard';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items: jewelryItems, status, error } = useSelector((state) => state.jewelry);

  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Количество украшений на странице

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(jewelryItems.length / itemsPerPage);

  // Вычисляем украшения для текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJewelryItems = jewelryItems.slice(indexOfFirstItem, indexOfLastItem);

  // Загружаем товары при монтировании компонента
  useEffect(() => {
    dispatch(resetStatus());
    dispatch(fetchJewelryItems());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <Box
        sx={{
          minHeight: '600px',
          display: 'flex', // Используем Flexbox для центрирования
          justifyContent: 'center', // Выравнивание по горизонтали
          alignItems: 'center', // Выравнивание по вертикали
        }}
      >
        <CircularProgress size={80} /> {/* Увеличиваем размер до 80px */}
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '600px' }}>
        <Typography color="error">Ошибка: {error}</Typography>
      </Box>
    );
  }

  // Обработчик смены страницы
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ minHeight: '808px', padding: 2 }}>
      <Box sx={{ minHeight: '808px' }}>
        <Grid container spacing={1}>
          {currentJewelryItems.map((jewelry) => (
            <Grid item key={jewelry.id} xs={6} sm={3} md={3} lg={3}>
              <JewelryCard jewelry={jewelry} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Пагинация */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={totalPages} // Общее количество страниц
          page={currentPage} // Текущая страница
          onChange={handlePageChange} // Обработчик смены страницы
          color="primary" // Цвет пагинации (использует primary цвет темы)
        />
      </Box>
    </Box>
  );
};

export default CatalogPage;
