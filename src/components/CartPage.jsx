import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Typography, Grid, Box, CircularProgress, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeFromCart } from '../slices/cartSlice';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import CartJewelry from './CartJewelry';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0.9;
    transform: scale(0.9);
  }
`;

const CartPage = () => {
  const dispatch = useDispatch();
  const {
    items: cartItems = [],
    cartStatus,
    fetchStatus,
    fetchError,
    cartError,
  } = useSelector((state) => state.cart || {});

  const tg = useWebApp();
  const userId = tg.initDataUnsafe?.user?.id.toString() || '6933164806'; // Telegram userId или тестовое значение

  const [isRemoving, setIsRemoving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [localCartItems, setLocalCartItems] = useState(cartItems || []);

  useEffect(() => {
    if (userId && cartItems.length === 0) {
      dispatch(fetchCartItems(userId))
        .unwrap()
        .then((response) => {
          setLocalCartItems(response || []);
        })
        .catch((error) => {
          console.error('Ошибка загрузки корзины: ', error);
          setLocalCartItems([]);
        });
    }
  }, [dispatch, userId, cartItems.length]);

  // Инициализация MainButton для оплаты
  useEffect(() => {
    const totalAmount = cartItems.reduce((total, item) => total + item.jewelry.price, 0);

    tg.MainButton.setText(`Оплатить $${totalAmount}`);
    tg.MainButton.show();

    tg.MainButton.onClick(() => handlePayment());

    return () => {
      tg.MainButton.offClick(handlePayment);
      tg.MainButton.hide();
    };
  }, [cartItems, tg]);

  const handleRemove = useCallback(
    (jewelryId) => {
      setIsRemoving(true);

      const updatedItems = localCartItems.map((item) =>
        item.jewelryId === jewelryId ? { ...item, isRemoving: true } : item,
      );
      setLocalCartItems(updatedItems);

      setTimeout(() => {
        setLocalCartItems((prevItems) => prevItems.filter((item) => item.jewelryId !== jewelryId));

        dispatch(removeFromCart({ jewelryId, telegramUserId: userId })).finally(() => {
          setIsRemoving(false);
        });
      }, 500);
    },
    [localCartItems, dispatch, userId],
  );

  const handlePayment = () => {
    const invoiceData = {
      title: 'Оплата заказа',
      description: 'Оплата за выбранные ювелирные изделия',
      payload: 'Custom-Payload',
      provider_token: 'TEST:12345', // Тестовый токен провайдера оплаты
      start_parameter: 'pay',
      currency: 'USD',
      prices: cartItems.map((item) => ({
        label: item.jewelry.title,
        amount: Math.round(item.jewelry.price * 100), // Цена в копейках/центах
      })),
    };

    tg.showInvoice(invoiceData, (status) => {
      if (status === 'ok') {
        console.log('Платеж успешно выполнен');
      } else {
        console.log('Ошибка при оплате');
      }
    });
  };

  const totalPages = Math.ceil((localCartItems?.length || 0) / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCartItems = useMemo(() => {
    return localCartItems?.slice(indexOfFirstItem, indexOfLastItem) || [];
  }, [localCartItems, indexOfFirstItem, indexOfLastItem]);

  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  }, []);

  const isLoading = fetchStatus === 'loading' || cartStatus === 'loading' || isRemoving;

  if (isLoading) {
    return (
      <Box
        sx={{ minHeight: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  const renderErrorMessage = (errorMessage) => (
    <Box
      sx={{
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography color="white">Ошибка: {errorMessage}</Typography>
    </Box>
  );

  if (fetchError || cartError) {
    return renderErrorMessage(fetchError || cartError);
  }

  if (!currentCartItems.length) {
    return (
      <Box sx={{ minHeight: '606px' }}>
        <Typography align="center" variant="h6" sx={{ marginTop: 4 }}>
          Ваша корзина пуста
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '808px', padding: 2 }}>
      <Box sx={{ minHeight: '808px' }}>
        <Typography variant="h4" align="center" gutterBottom>
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

export default CartPage;
