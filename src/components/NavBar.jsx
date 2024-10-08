import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import logoImg from '../assets/icon.jpg';
import { useTheme } from '@mui/material/styles';
import { resetStatus, fetchJewelryItems } from '../slices/JewelrySlice';
import { fetchCartItems, resetCartState } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';
import navBarStyles from './styles/NavBarStyles'; // Импортируем стили

const NavBar = () => {
  const dispatch = useDispatch();
  const theme = useTheme(); // Получаем доступ к теме
  const { MainButton } = useWebApp();
  const navigate = useNavigate();
  const tg = useWebApp();
  const userId = tg.initDataUnsafe?.user?.id.toString() || '6933164806';

  const styles = navBarStyles(theme); // Получаем стили с темой

  const handleHomeClick = () => {
    navigate('/main');
    window.scrollTo(0, 0);
  };

  const handleCartClick = () => {
    navigate('/cart');
    dispatch(resetCartState());
    dispatch(fetchCartItems(userId)).then(() => {
      setTimeout(() => {}, 500);
    });
    window.scrollTo(0, 0);
    MainButton.show(); // Показываем основную кнопку через useWebApp
  };

  const handleCatalogClick = () => {
    navigate('/catalog');
    dispatch(resetStatus());
    dispatch(fetchJewelryItems());
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          <IconButton onClick={handleHomeClick}>
            <img src={logoImg} alt="Logo" style={styles.logo} />
          </IconButton>
          <Typography variant="h6" sx={styles.title}>
            Noir
          </Typography>
          <Box sx={styles.navButtons}>
            <Button size="large" color="inherit" onClick={handleCatalogClick}>
              Catalog
            </Button>
            <Box sx={styles.cartButton}>
              <Button size="large" color="inherit" onClick={handleCartClick}>
                Cart
                <Badge color="secondary">
                  <ShoppingCartIcon sx={styles.cartIcon} />
                </Badge>
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
