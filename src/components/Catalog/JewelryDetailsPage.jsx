import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, CircularProgress, IconButton } from '@mui/material';
import { fetchJewelryById } from '../../slices/JewelrySlice';
import { addToCart, removeFromCart, fetchCartItems } from '../../slices/cartSlice';
import Slider from 'react-slick'; // Слайдер для изображений
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const JewelryDetailsPage = () => {
  const tg = useWebApp();
  const telegramUserId = tg.initDataUnsafe?.user?.id || '6933164806';
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(false);
  const [isRemoveFromCartDisabled, setIsRemoveFromCartDisabled] = useState(false);

  const jewelry = useSelector((state) =>
    state.jewelry.items.find((item) => item.id === Number(id)),
  );
  const isLoading = useSelector((state) => state.jewelry.status === 'loading');
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.jewelryId === jewelry?.id);

  useEffect(() => {
    if (!jewelry) {
      dispatch(fetchJewelryById(id));
    }
  }, [dispatch, id, jewelry]);

  useEffect(() => {
    dispatch(fetchCartItems(telegramUserId));
  }, [dispatch, telegramUserId]);

  const refreshCartItems = useCallback(() => {
    dispatch(fetchCartItems(telegramUserId));
  }, [dispatch, telegramUserId]);

  const handleAddToCart = useCallback(() => {
    setIsAddToCartDisabled(true);
    dispatch(addToCart({ jewelryId: jewelry.id, telegramUserId }))
      .then(refreshCartItems)
      .finally(() => setIsAddToCartDisabled(false));
  }, [dispatch, jewelry?.id, telegramUserId, refreshCartItems]);

  const handleRemoveFromCart = useCallback(() => {
    setIsRemoveFromCartDisabled(true);
    dispatch(removeFromCart({ jewelryId: jewelry.id, telegramUserId }))
      .then(refreshCartItems)
      .finally(() => setIsRemoveFromCartDisabled(false));
  }, [dispatch, jewelry?.id, telegramUserId, refreshCartItems]);

  if (isLoading || !jewelry) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Typography variant="h5" color="error">
            Изделие не найдено
          </Typography>
        )}
      </Box>
    );
  }

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

  const isButtonDisabled = isAddToCartDisabled || jewelry.quantity <= 0;

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#1C1C1C', color: '#FFFFFF' }}>
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

      <Typography variant="h4" sx={{ marginTop: '20px' }}>
        {jewelry.title}
      </Typography>
      <Typography variant="h5" color="primary">
        ${jewelry.price.toFixed(2)}
      </Typography>

      <Typography variant="body1" sx={{ marginTop: '20px' }}>
        {jewelry.description}
      </Typography>

      {jewelry.quantity <= 0 && (
        <Typography variant="body2" color="error" sx={{ marginTop: '10px' }}>
          Это изделие больше недоступно
        </Typography>
      )}

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
            disabled={isButtonDisabled}
            sx={{ marginTop: '30px' }}
          >
            Добавить в корзину
          </Button>
        )}
      </Box>
    </Box>
  );
};

const arrowStyles = {
  position: 'absolute',
  zIndex: 2,
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
};

const CustomPrevArrow = ({ onClick }) => (
  <IconButton sx={{ ...arrowStyles, left: '10px' }} onClick={onClick}>
    <ArrowBackIcon />
  </IconButton>
);

const CustomNextArrow = ({ onClick }) => (
  <IconButton sx={{ ...arrowStyles, right: '10px' }} onClick={onClick}>
    <ArrowForwardIcon />
  </IconButton>
);

export default JewelryDetailsPage;
