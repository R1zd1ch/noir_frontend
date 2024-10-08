import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme(); // Доступ к теме

  return (
    <AppBar
      position="relative"
      sx={{
        top: 'auto',
        bottom: 0,
        height: { xs: '80px', md: '100px' }, // Адаптивная высота
        width: '100%',
        backgroundColor: theme.palette.backgroundAppBar.default,
        color: theme.palette.text.primary,
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
              fontFamily: 'Cinzel, serif', // Шрифт для текста
            }}
          >
            <Typography variant="body1" sx={{ fontSize: { xs: '14px', md: '16px' } }}>
              © 2024 Noir Jewelry Store. Все права защищены.
            </Typography>
            <Typography variant="body2" sx={{ fontSize: { xs: '12px', md: '14px' }, mt: 0.5 }}>
              Свяжитесь с нами: info@noirstore.com
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
