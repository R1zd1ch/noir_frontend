import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  CircularProgress,
  Typography,
  Box,
  Pagination,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { motion } from 'framer-motion';
import { fetchJewelryItems, resetStatus } from '../../slices/JewelrySlice';
import JewelryCard from './JewelryCard';
import catalogPageStyles from './styles/CatalogPageStyles';

const LoadingComponent = () => {
  return (
    <Box sx={catalogPageStyles.loadingBox}>
      <CircularProgress size={80} />
    </Box>
  );
};

const RenderCards = ({ currentJewelryItems, fadeIn }) => {
  return (
    <Grid container spacing={1}>
      {currentJewelryItems.map((jewelry) => (
        <Grid item key={jewelry.id} xs={6} sm={3} md={3} lg={3}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <JewelryCard jewelry={jewelry} />
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items: jewelryItems, status, error } = useSelector((state) => state.jewelry);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('all');
  const [priceOrder, setPriceOrder] = useState('none'); // Добавляем состояние "none"
  const itemsPerPage = 4;

  const jewelryTypes = useMemo(() => {
    if (!Array.isArray(jewelryItems)) return [];

    const types = jewelryItems
      .map((item) => item.type)
      .filter((type, index, self) => type && self.indexOf(type) === index);
    return ['all', ...types];
  }, [jewelryItems]);

  const handleTypeChange = useCallback((event) => {
    setSelectedType(event.target.value);
    setCurrentPage(1);
  }, []);

  const handlePriceOrderChange = useCallback((event) => {
    setPriceOrder(event.target.value);
    setCurrentPage(1);
  }, []);

  const sortedJewelryItems = useMemo(() => {
    if (!Array.isArray(jewelryItems)) return [];

    const filteredItems =
      selectedType === 'all'
        ? jewelryItems
        : jewelryItems.filter((item) => item.type === selectedType);

    // Логика сортировки: если выбрано "none", оставляем исходный порядок
    const sortedItems =
      priceOrder === 'none'
        ? filteredItems
        : [...filteredItems].sort((a, b) =>
            priceOrder === 'asc' ? a.price - b.price : b.price - a.price,
          );

    const availableJewelryItems = sortedItems.filter((item) => item.quantity > 0);
    const unavailableJewelryItems = sortedItems.filter(
      (item) => item.quantity === 0 || item.quantity == null,
    );

    return [...availableJewelryItems, ...unavailableJewelryItems];
  }, [jewelryItems, selectedType, priceOrder]);

  const totalPages = useMemo(
    () => Math.ceil(sortedJewelryItems.length / itemsPerPage),
    [sortedJewelryItems.length],
  );
  const currentJewelryItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return sortedJewelryItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, sortedJewelryItems, itemsPerPage]);

  useEffect(() => {
    dispatch(resetStatus());
    dispatch(fetchJewelryItems());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(resetStatus());
    }
  }, [status, dispatch]);

  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const mainAnim = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  if (error && status !== 'succeeded') {
    return (
      <Box sx={catalogPageStyles.errorBox}>
        <Typography sx={catalogPageStyles.complainText}>Ошибка: {error}</Typography>
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
        {' '}
        <motion.div initial="hidden" animate="visible" variants={mainAnim}>
          <Typography sx={catalogPageStyles.itemsTitle} variant="h2" align="center">
            Наши украшения:
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <FormControl sx={catalogPageStyles.selectBox}>
              <InputLabel id="select-type-label" shrink>
                Тип товара
              </InputLabel>
              <Select
                labelId="select-type-label"
                value={selectedType}
                onChange={handleTypeChange}
                label="Тип товара"
                sx={{ backgroundColor: 'black', color: 'white' }}
                MenuProps={catalogPageStyles.menuProps}
              >
                {jewelryTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type === 'all' ? 'Все' : type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ ...catalogPageStyles.selectBox, ml: 2 }}>
              <InputLabel id="price-order-label" shrink>
                Сортировка по цене
              </InputLabel>
              <Select
                labelId="price-order-label"
                value={priceOrder}
                onChange={handlePriceOrderChange}
                label="Сортировка по цене"
                sx={{ backgroundColor: 'black', color: 'white' }}
                MenuProps={catalogPageStyles.menuProps}
              >
                <MenuItem value="none">Без сортировки</MenuItem>
                <MenuItem value="asc">По возрастанию</MenuItem>
                <MenuItem value="desc">По убыванию</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </motion.div>
        {status === 'loading' ? (
          <LoadingComponent />
        ) : (
          <RenderCards currentJewelryItems={currentJewelryItems} fadeIn={fadeIn} />
        )}
      </Box>

      <Box sx={catalogPageStyles.paginationBox}>
        <motion.div initial="hidden" animate="visible" variants={mainAnim}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </motion.div>
      </Box>
    </Box>
  );
};

export default CatalogPage;
