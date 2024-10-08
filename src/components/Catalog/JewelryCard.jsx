import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, fetchCartItems } from '../../slices/cartSlice';
import { createSelector } from 'reselect';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom';
import jewelryCardStyles from './styles/JewelryCardStyles'; // Импортируем стили

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
  const navigate = useNavigate();

  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  const [isRemoveButtonDisabled, setIsRemoveButtonDisabled] = useState(false);
  const [isAddHovered, setIsAddHovered] = useState(false);
  const [isRemoveHovered, setIsRemoveHovered] = useState(false);

  const isInCart = useSelector((state) => selectIsInCart(jewelry.id)(state));
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCartItems(telegramUserId));
  }, [dispatch, telegramUserId]);

  const handleOpenDetails = () => {
    navigate(`/jewelry/${jewelry.id}`);
  };

  const handleAddToCart = useCallback(() => {
    setIsAddButtonDisabled(true);

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

  const handleRemoveFromCart = useCallback(() => {
    setIsRemoveButtonDisabled(true);

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
    <Card sx={jewelryCardStyles.card}>
      <Box onClick={handleOpenDetails}>
        {jewelry.images.length > 0 && (
          <CardMedia
            component="img"
            height="200"
            image={jewelry.images[0].url}
            alt={jewelry.title}
            sx={jewelryCardStyles.media}
          />
        )}
        <CardContent sx={jewelryCardStyles.content}>
          <Typography variant="h5" component="div" sx={jewelryCardStyles.title}>
            {jewelry.title}
          </Typography>
          <Box sx={jewelryCardStyles.descriptionBox}>
            <Typography variant="body2">{jewelry.description}</Typography>
          </Box>
          <Typography variant="h6" color="primary">
            ${jewelry.price.toFixed(2)}
          </Typography>
          {jewelry.quantity <= 0 && (
            <Typography variant="body2" color="error">
              Продано
            </Typography>
          )}
        </CardContent>
      </Box>

      <Box sx={jewelryCardStyles.actions}>
        <IconButton
          aria-label="remove from cart"
          onClick={handleRemoveFromCart}
          onTouchStart={() => setIsRemoveHovered(true)}
          onTouchEnd={() => setIsRemoveHovered(false)}
          disabled={isLoading || !isInCart || jewelry.quantity <= 0 || isRemoveButtonDisabled}
          sx={jewelryCardStyles.removeButton(isRemoveHovered)}
        >
          <RemoveIcon />
        </IconButton>

        <IconButton
          aria-label="add to cart"
          onClick={handleAddToCart}
          onTouchStart={() => setIsAddHovered(true)}
          onTouchEnd={() => setIsAddHovered(false)}
          disabled={isLoading || isInCart || jewelry.quantity <= 0 || isAddButtonDisabled}
          sx={jewelryCardStyles.addButton(isAddHovered)}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Card>
  );
});

export default JewelryCard;
