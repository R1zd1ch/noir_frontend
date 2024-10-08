import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress, Typography, Box, Pagination, Button } from '@mui/material';
import { fetchJewelryItems, resetStatus } from '../../slices/JewelrySlice';
import JewelryCard from './JewelryCard';
import catalogPageStyles from './styles/CatalogPageStyles';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items: jewelryItems, status, error } = useSelector((state) => state.jewelry);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Мемоизация фильтрованных и отсортированных товаров
  const sortedJewelryItems = useMemo(() => {
    if (!Array.isArray(jewelryItems)) return [];
    const availableJewelryItems = jewelryItems.filter((item) => item.quantity > 0);
    const unavailableJewelryItems = jewelryItems.filter(
      (item) => item.quantity === 0 || item.quantity == null,
    );
    return [...availableJewelryItems, ...unavailableJewelryItems];
  }, [jewelryItems]);

  // Пагинация: индексы для текущей страницы
  const totalPages = useMemo(
    () => Math.ceil(sortedJewelryItems.length / itemsPerPage),
    [sortedJewelryItems.length],
  );
  const currentJewelryItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return sortedJewelryItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, sortedJewelryItems, itemsPerPage]);

  // Загрузка данных при монтировании
  useEffect(() => {
    dispatch(resetStatus());
    dispatch(fetchJewelryItems());
  }, [dispatch]);

  // Сброс ошибки при успешной загрузке
  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(resetStatus());
    }
  }, [status, dispatch]);

  // Обработчик смены страницы с мемоизацией
  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  }, []);

  if (status === 'loading') {
    return (
      <Box sx={catalogPageStyles.loadingBox}>
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (error && status !== 'succeeded') {
    return (
      <Box sx={catalogPageStyles.errorBox}>
        <Typography sx={catalogPageStyles.complainText}>Ошибка: {error}</Typography>
        <Typography sx={catalogPageStyles.complainText}>
          Чтобы сообщить об ошибке и поныть
        </Typography>
        <Typography sx={catalogPageStyles.complainText} align="center">
          Нажмите на&nbsp;
          <Button
            variant="contained"
            color="primary"
            href="https://t.me/r1zzd"
            target="_blank"
            rel="noopener noreferrer"
            sx={catalogPageStyles.complainButton}
          >
            Пожаловаться
          </Button>
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={catalogPageStyles.retryButton}
          onClick={() => dispatch(fetchJewelryItems())}
        >
          Повторить загрузку
        </Button>
      </Box>
    );
  }

  if (currentJewelryItems.length === 0 && status !== 'loading') {
    return (
      <Box sx={catalogPageStyles.noItemsBox}>
        <Typography sx={catalogPageStyles.noItemsText} variant="h6">
          Нет доступных украшений для отображения
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={catalogPageStyles.pageContainer}>
      <Box sx={catalogPageStyles.itemsContainer}>
        <Typography sx={catalogPageStyles.itemsTitle} variant="h2" align="center">
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
      <Box sx={catalogPageStyles.paginationBox}>
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
