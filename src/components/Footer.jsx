import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Импортируем useTheme для доступа к теме

const Footer = () => {
  const theme = useTheme(); // Получаем доступ к теме

  return (
    <AppBar
      position="relative"
      sx={{
        top: 'auto',
        bottom: 0,
        height: '100px',
        width: '100%',
        backgroundColor: theme.palette.backgroundAppBar.default, // Цвет фона из темы
        color: theme.palette.text.primary, // Цвет текста из темы
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.5)',
        padding: '10px 0',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Toolbar>
          <Box
            sx={{
              textAlign: 'center',
              fontFamily: 'Cinzel, serif', // Можно указать шрифт, если он используется в теме
            }}
          >
            <Typography variant="body1">© 2024 Noir Jewelry Store. Все права защищены.</Typography>
            <Typography variant="body2">Свяжитесь с нами: info@noirstore.com</Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
