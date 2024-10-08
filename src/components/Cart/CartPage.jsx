import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Typography, Grid, Box, CircularProgress, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeFromCart } from '../../slices/cartSlice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PaymentButton from '../Buttons/PaymentButton';
import CartJewelry from './CartJewelry';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import cartPageStyles, { fadeIn, fadeOut } from './styles/CartPageStyles';

const CartPage = () => {
  const tg = useWebApp();
  const tgUserId = tg.initDataUnsafe?.user?.id.toString();
  const userId = tgUserId || '6933164806';
  const dispatch = useDispatch();

  const {
    items: cartItems = [],
    cartStatus,
    fetchStatus,
    fetchError,
    cartError,
  } = useSelector((state) => state.cart || {});

  const [isRemoving, setIsRemoving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [localCartItems, setLocalCartItems] = useState(cartItems || []);

  // Эффект для загрузки товаров в корзине, мемоизируем зависимости
  useEffect(() => {
    if (userId && cartItems.length === 0) {
      dispatch(fetchCartItems(userId))
        .unwrap()
        .then((response) => setLocalCartItems(response || []))
        .catch((error) => {
          console.error('Ошибка загрузки корзины: ', error);
          setLocalCartItems([]);
        });
    }
  }, [dispatch, cartItems.length, userId]);

  // Мемоизация функции удаления товара
  const handleRemove = useCallback(
    (jewelryId) => {
      setIsRemoving(true);
      const updatedItems = localCartItems.map((item) =>
        item.jewelryId === jewelryId ? { ...item, isRemoving: true } : item,
      );
      setLocalCartItems(updatedItems);

      setTimeout(() => {
        setLocalCartItems((prevItems) => prevItems.filter((item) => item.jewelryId !== jewelryId));
        dispatch(removeFromCart({ jewelryId, telegramUserId: userId })).finally(() =>
          setIsRemoving(false),
        );
      }, 500);
    },
    [localCartItems, dispatch, userId],
  );

  // Пагинация: мемоизируем вычисление текущих страниц
  const totalPages = useMemo(
    () => Math.ceil((localCartItems?.length || 0) / itemsPerPage),
    [localCartItems.length],
  );
  const currentCartItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return localCartItems.slice(indexOfFirstItem, indexOfLastItem) || [];
  }, [localCartItems, currentPage, itemsPerPage]);

  // Мемоизация функции смены страницы
  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  }, []);

  const isLoading = useMemo(
    () => fetchStatus === 'loading' || cartStatus === 'loading' || isRemoving,
    [fetchStatus, cartStatus, isRemoving],
  );

  if (isLoading) {
    return (
      <Box sx={cartPageStyles.loadingBox}>
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (fetchError || cartError) {
    return (
      <Box sx={cartPageStyles.errorBox}>
        <Typography color="white">Ошибка: {fetchError || cartError}</Typography>
      </Box>
    );
  }

  if (!currentCartItems.length) {
    return (
      <Box sx={cartPageStyles.emptyCartBox}>
        <Typography align="center" variant="h6" sx={cartPageStyles.emptyCartText}>
          Ваша корзина пуста
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={cartPageStyles.cartContainer}>
      <Typography variant="h4" align="center" gutterBottom sx={cartPageStyles.cartTitle}>
        Ваша Корзина
      </Typography>
      <TransitionGroup component={Grid} container spacing={1}>
        {currentCartItems.map((item) => (
          <CSSTransition
            key={item.jewelryId}
            timeout={500}
            classNames={{
              enter: 'fade-enter',
              enterActive: 'fade-enter-active',
              exit: 'fade-exit',
              exitActive: 'fade-exit-active',
            }}
            onEnter={(node) => {
              node.style.animation = `${fadeIn} 500ms forwards`;
            }}
            onExit={(node) => {
              node.style.animation = `${fadeOut} 500ms forwards`;
            }}
          >
            <Grid item xs={6} sm={3} md={3} lg={3}>
              {item.jewelry && <CartJewelry item={item} onRemove={handleRemove} />}
            </Grid>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <Box sx={cartPageStyles.paginationBox}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <PaymentButton />
    </Box>
  );
};

export default CartPage;
