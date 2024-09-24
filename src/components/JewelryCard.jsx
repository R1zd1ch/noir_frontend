import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, fetchCartItems } from '../slices/cartSlice';
import { createSelector } from 'reselect';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom'; // Новый импорт для навигации

// Селекторы для оптимизации выборки данных
const selectCartItems = (state) => state.cart.items;
const selectIsInCart = (jewelryId) =>
  createSelector(selectCartItems, (cartItems) =>
    cartItems.some((item) => item.jewelryId === jewelryId),
  );

// Добавим селекторы для отслеживания статусов загрузки
const selectIsLoading = (state) => state.cart.loading;

const JewelryCard = React.memo(({ jewelry }) => {
  const dispatch = useDispatch();
  const tg = useWebApp();
  const telegramUserId = tg.initDataUnsafe?.user?.id.toString() || '6933164806';
  const navigate = useNavigate(); // Инициализация навигации

  // Отдельные состояния для блокировки каждой кнопки
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  const [isRemoveButtonDisabled, setIsRemoveButtonDisabled] = useState(false);
  const [isAddHovered, setIsAddHovered] = useState(false);
  const [isRemoveHovered, setIsRemoveHovered] = useState(false);

  // Получаем статус и наличие товара в корзине через селекторы
  const isInCart = useSelector(useCallback(selectIsInCart(jewelry.id), [jewelry.id]));
  const isLoading = useSelector(selectIsLoading); // Отслеживаем статус загрузки из Redux

  // Загружаем корзину при монтировании компонента
  useEffect(() => {
    dispatch(fetchCartItems(telegramUserId));
  }, [dispatch, telegramUserId]);

  // Обработчик для перехода на полную версию карточки
  const handleOpenDetails = () => {
    navigate(`/jewelry/${jewelry.id}`); // Переход на страницу полной версии ювелирного изделия
  };

  // Добавление в корзину
  const handleAddToCart = useCallback(() => {
    setIsAddButtonDisabled(true); // Немедленная блокировка кнопки

    dispatch(addToCart({ jewelryId: jewelry.id, telegramUserId }))
      .then(() => {
        dispatch(fetchCartItems(telegramUserId));
      })
      .catch(() => {
        setIsAddButtonDisabled(false);
      })
      .finally(() => {
        setTimeout(() => setIsAddButtonDisabled(false), 500);
      });
  }, [dispatch, jewelry.id, telegramUserId]);

  // Удаление из корзины
  const handleRemoveFromCart = useCallback(() => {
    setIsRemoveButtonDisabled(true); // Немедленная блокировка кнопки

    dispatch(removeFromCart({ jewelryId: jewelry.id, telegramUserId }))
      .then(() => {
        dispatch(fetchCartItems(telegramUserId));
      })
      .catch(() => {
        setIsRemoveButtonDisabled(false);
      })
      .finally(() => {
        setTimeout(() => setIsRemoveButtonDisabled(false), 500);
      });
  }, [dispatch, jewelry.id, telegramUserId]);

  return (
    <Card
      sx={{
        height: '100%',
        backgroundColor: '#212121',
        color: '#FFFFFF',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <Box onClick={handleOpenDetails}>
        {jewelry.images.length > 0 && (
          <CardMedia
            component="img"
            height="200"
            image={jewelry.images[0].url}
            alt={jewelry.title}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent sx={{ height: '180px', overflow: 'hidden' }}>
          <Typography variant="h5" component="div" sx={{ whiteSpace: 'normal' }}>
            {jewelry.title}
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
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          padding: '0 15px',
          height: '60px',
        }}
      >
        <IconButton
          aria-label="remove from cart"
          onClick={handleRemoveFromCart}
          onTouchStart={() => setIsRemoveHovered(true)}
          onTouchEnd={() => setIsRemoveHovered(false)}
          disabled={isLoading || !isInCart || jewelry.sold || isRemoveButtonDisabled}
          sx={{
            color: '#FF0000',
            backgroundColor: isRemoveHovered ? '#FF4C4C' : '#000', // Подсветка
            borderRadius: '12px',
            padding: '10px 20px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
          }}
        >
          <RemoveIcon />
        </IconButton>

        <IconButton
          aria-label="add to cart"
          onClick={handleAddToCart}
          onTouchStart={() => setIsAddHovered(true)}
          onTouchEnd={() => setIsAddHovered(false)}
          disabled={isLoading || isInCart || jewelry.sold || isAddButtonDisabled}
          sx={{
            color: '#00FF00',
            backgroundColor: isAddHovered ? '#4CFF4C' : '#000', // Подсветка
            borderRadius: '12px',
            padding: '10px 20px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Card>
  );
});

export default JewelryCard;
