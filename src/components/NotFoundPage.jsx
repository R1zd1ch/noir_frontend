import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const NotFoundPage = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', py: 8, minHeight: '580px' }}>
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Страница не найдена
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}>
          К сожалению, запрашиваемая вами страница не существует. Проверьте адрес или вернитесь на
          главную страницу.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
          onClick={() => (window.location.href = '/main')} // Перенаправление на главную страницу
        >
          Вернуться на главную
        </Button>
      </motion.div>
    </Container>
  );
};

export default NotFoundPage;
