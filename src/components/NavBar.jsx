import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useWebApp } from '@vkruglikov/react-telegram-web-app'; // Импортируем useWebApp
import logoImg from '../assets/icon.jpg';
import { useTheme } from '@mui/material/styles'; // Импортируем useTheme для доступа к теме
import { resetStatus, fetchJewelryItems } from '../slices/JewelrySlice';
import { useDispatch } from 'react-redux';

const NavBar = () => {
  const dispatch = useDispatch();
  const theme = useTheme(); // Получаем доступ к теме
  const { MainButton } = useWebApp();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/main');
    window.scrollTo(0, 0);
  };

  const handleCartClick = () => {
    navigate('/cart');
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
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.backgroundAppBar.default, // Используем цвет фона из темы
          color: theme.palette.text.primary, // Цвет текста из темы
          boxShadow: 50,
        }}
      >
        <Toolbar sx={{ height: '75px', display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleHomeClick}>
            <img
              src={logoImg}
              alt="Logo"
              style={{ width: '60px', height: '60px', borderRadius: '10px' }}
            />
          </IconButton>
          <Typography variant="h6" sx={{ fontSize: '36px', marginLeft: '10px' }}>
            Noir
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'space-around',
              marginLeft: '15px',
            }}
          >
            <Button size="large" color="inherit" onClick={handleCatalogClick}>
              Catalog
            </Button>
            <Box sx={{ display: 'flex' }}>
              <Button size="large" color="inherit" onClick={handleCartClick}>
                Cart
                <Badge color="secondary">
                  <ShoppingCartIcon sx={{ color: 'white', marginLeft: '10px' }} />
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
