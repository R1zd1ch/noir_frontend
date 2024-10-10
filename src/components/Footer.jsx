import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Icon32LogoVk } from '@vkontakte/icons';

const Footer = () => {
  const theme = useTheme(); // Доступ к теме

  return (
    <AppBar
      position="relative"
      sx={{
        top: 'auto',
        bottom: 0,
        height: { xs: '100px', md: '120px' }, // Адаптивная высота
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
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Toolbar
          sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Текст с авторскими правами */}
          <Typography variant="body1" sx={{ fontSize: '15px', textAlign: 'center' }}>
            © 2024 Noir Jewelry Store. Все права защищены.
          </Typography>

          {/* Контейнер для текста "Свяжитесь с нами" и иконок */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: -1, // Отступ сверху
            }}
          >
            <Typography variant="body2" sx={{ fontSize: '17px', textAlign: 'center' }}>
              Свяжитесь с нами:
            </Typography>

            {/* Иконки социальных сетей */}
            <IconButton
              component="a"
              href="https://vk.com/noir_jewelry"
              target="_blank"
              rel="noopener noreferrer"
              fill="red"
              sx={{ color: theme.palette.text.primary, ml: 0 }} // Отступ между текстом и иконками
              aria-label="VK"
            >
              <Icon32LogoVk width={30} height={30} />
            </IconButton>

            <IconButton
              component="a"
              href="https://t.me/noir_jewelry"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: theme.palette.text.primary, ml: -1.5 }}
              aria-label="Telegram"
            >
              <TelegramIcon sx={{ fontSize: 30, color: 'white' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
