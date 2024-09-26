import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { fetchJewelryById } from '../slices/JewelrySlice'; // Импортируем новое действие
import { addToCart, removeFromCart, fetchCartItems } from '../slices/cartSlice';
import Slider from 'react-slick'; // Слайдер для изображений
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Стрелка влево
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Стрелка вправо

const JewelryDetailsPage = () => {
  const tg = useWebApp();
  const telegramUserId = tg.initDataUnsafe?.user?.id.toString() || '6933164806';
  const { id } = useParams(); // Получаем ID ювелирного изделия из URL
  const dispatch = useDispatch();
  const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(false);
  const [isRemoveFromCartDisabled, setIsRemoveFromCartDisabled] = useState(false);

  // Данные ювелирного изделия
  const jewelry = useSelector((state) =>
    state.jewelry.items.find((item) => item.id === Number(id)),
  );
  const isLoading = useSelector((state) => state.jewelry.status === 'loading');
  const cartItems = useSelector((state) => state.cart.items);

  // Проверка, есть ли товар в корзине
  const isInCart = cartItems.some((item) => item.jewelryId === jewelry?.id);

  useEffect(() => {
    // Загружаем данные украшения, если их еще нет в store
    if (!jewelry) {
      dispatch(fetchJewelryById(id));
    }
    // Загружаем содержимое корзины
    dispatch(fetchCartItems(telegramUserId));
  }, [dispatch, id, jewelry, telegramUserId]);

  // Добавление в корзину
  const handleAddToCart = useCallback(() => {
    setIsAddToCartDisabled(true);
    dispatch(addToCart({ jewelryId: jewelry.id, telegramUserId }))
      .then(() => {
        dispatch(fetchCartItems(telegramUserId));
      })
      .finally(() => setIsAddToCartDisabled(false));
  }, [dispatch, jewelry?.id, telegramUserId]);

  // Удаление из корзины
  const handleRemoveFromCart = useCallback(() => {
    setIsRemoveFromCartDisabled(true);
    dispatch(removeFromCart({ jewelryId: jewelry.id, telegramUserId }))
      .then(() => {
        dispatch(fetchCartItems(telegramUserId));
      })
      .finally(() => setIsRemoveFromCartDisabled(false));
  }, [dispatch, jewelry?.id, telegramUserId]);

  if (isLoading) {
    return <CircularProgress color="secondary" />;
  }

  if (!jewelry) {
    return (
      <Typography variant="h5" color="error">
        Изделие не найдено
      </Typography>
    );
  }

  // Настройки слайдера изображений
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#1C1C1C', color: '#FFFFFF' }}>
      {/* Слайдер изображений */}
      {jewelry.images.length > 0 && (
        <Slider {...sliderSettings}>
          {jewelry.images.map((image, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <img
                src={image.url}
                alt={jewelry.title}
                style={{ maxHeight: '300px', objectFit: 'cover', margin: '0 auto' }}
              />
            </Box>
          ))}
        </Slider>
      )}

      {/* Заголовок и цена */}
      <Typography variant="h4" sx={{ marginTop: '20px' }}>
        {jewelry.title}
      </Typography>
      <Typography variant="h5" color="primary">
        ${jewelry.price.toFixed(2)}
      </Typography>

      {/* Полное описание */}
      <Typography variant="body1" sx={{ marginTop: '20px' }}>
        {jewelry.description}
      </Typography>

      {/* Статус наличия */}
      {jewelry.quantity <= 0 && (
        <Typography variant="body2" color="error" sx={{ marginTop: '10px' }}>
          Это изделие продано
        </Typography>
      )}

      {/* Сообщение о доступности, если количество меньше или равно 0 */}
      {jewelry.quantity <= 0 && (
        <Typography variant="body2" color="error" sx={{ marginTop: '10px' }}>
          Это изделие больше недоступно
        </Typography>
      )}

      {/* Кнопки "Добавить в корзину" или "Удалить из корзины" */}
      <Box display="flex" justifyContent="center">
        {isInCart ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRemoveFromCart}
            disabled={isRemoveFromCartDisabled || jewelry.quantity <= 0}
            sx={{ marginTop: '30px' }}
          >
            Удалить из корзины
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            disabled={
              isAddToCartDisabled || jewelry.quantity <= 0 // Блокируем кнопку, если количество <= 0
            }
            sx={{ marginTop: '30px' }}
          >
            Добавить в корзину
          </Button>
        )}
      </Box>
    </Box>
  );
};

// Кастомная левая стрелка
const CustomPrevArrow = ({ onClick }) => {
  return (
    <IconButton
      sx={{
        position: 'absolute',
        left: '10px', // Позиционирование стрелки
        zIndex: 2,
        top: '50%', // Центрирование
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 1)', // Ярче при наведении
        },
      }}
      onClick={onClick}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

// Кастомная правая стрелка
const CustomNextArrow = ({ onClick }) => {
  return (
    <IconButton
      sx={{
        position: 'absolute',
        right: '10px', // Позиционирование стрелки
        zIndex: 2,
        top: '50%', // Центрирование
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 1)', // Ярче при наведении
        },
      }}
      onClick={onClick}
    >
      <ArrowForwardIcon />
    </IconButton>
  );
};

export default JewelryDetailsPage;
