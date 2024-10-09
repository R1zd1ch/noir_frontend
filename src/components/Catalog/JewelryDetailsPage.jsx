import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, CircularProgress, IconButton } from '@mui/material';
import { fetchJewelryById } from '../../slices/JewelrySlice';
import { addToCart, removeFromCart, fetchCartItems } from '../../slices/cartSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './styles/JewelryDetailsPageStyles'; // Импорт стилей

const JewelryDetailsPage = () => {
  const tg = useWebApp();
  const telegramUserId = tg.initDataUnsafe?.user?.id.toString() || '6933164806';
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(fetchCartItems(telegramUserId));
  }, [dispatch, id, jewelry, telegramUserId]);

  const handleBackButton = () => {
    navigate('/catalog');
  };

  const handleAddToCart = useCallback(() => {
    setIsAddToCartDisabled(true);
    dispatch(addToCart({ jewelryId: jewelry.id, telegramUserId }))
      .then(() => {
        dispatch(fetchCartItems(telegramUserId));
      })
      .finally(() => setIsAddToCartDisabled(false));
  }, [dispatch, jewelry?.id, telegramUserId]);

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
    <Box sx={styles.container}>
      <IconButton sx={styles.backButton} onClick={handleBackButton}>
        <ArrowBackIcon></ArrowBackIcon>
      </IconButton>
      {jewelry.images.length > 0 && (
        <Slider {...sliderSettings}>
          {jewelry.images.map((image, index) => (
            <Box key={index} sx={styles.imageContainer}>
              <img src={image.url} alt={jewelry.title} style={styles.image} />
            </Box>
          ))}
        </Slider>
      )}

      <Typography variant="h4" sx={styles.title}>
        {jewelry.title}
      </Typography>
      <Typography variant="h5" sx={styles.price}>
        ${jewelry.price.toFixed(2)}
      </Typography>

      <Typography variant="body1" sx={styles.description}>
        {jewelry.description}
      </Typography>

      {jewelry.quantity <= 0 && (
        <Typography variant="body2" sx={styles.soldOutText}>
          Это изделие больше недоступно
        </Typography>
      )}

      <Box sx={styles.buttonContainer}>
        {isInCart ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRemoveFromCart}
            disabled={isRemoveFromCartDisabled || jewelry.quantity <= 0}
          >
            Удалить из корзины
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            disabled={isAddToCartDisabled || jewelry.quantity <= 0}
          >
            Добавить в корзину
          </Button>
        )}
      </Box>
    </Box>
  );
};

const CustomPrevArrow = ({ onClick }) => {
  return (
    <IconButton sx={styles.prevArrow} onClick={onClick}>
      <ArrowBackIcon />
    </IconButton>
  );
};

const CustomNextArrow = ({ onClick }) => {
  return (
    <IconButton sx={styles.nextArrow} onClick={onClick}>
      <ArrowForwardIcon />
    </IconButton>
  );
};

export default JewelryDetailsPage;
