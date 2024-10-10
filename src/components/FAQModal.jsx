import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { robotoFont, buttonStyles, containerStyles } from './styles/MainPageStyles';

const FAQModal = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundImage: containerStyles.backgroundImage, // Добавляем фон для модального окна
          backgroundSize: containerStyles.backgroundSize,
          backgroundPosition: containerStyles.backgroundPosition,
          padding: '20px',
          position: 'relative',
          borderRadius: '8px',
          color: '#fff',
        },
      }}
    >
      <Box sx={{ ...robotoFont }}>
        <DialogTitle>
          <Typography
            variant="h5" // Изменено на h5, чтобы избежать вложенности h4 в h2
            component="h2" // Оставляем правильную семантику заголовка
            sx={{
              textAlign: 'center',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              mb: 2,
              ...robotoFont,
            }}
          >
            Часто задаваемые вопросы
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            sx={{
              color: '#fff',
              fontSize: '16px',
              lineHeight: '1.8',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
              ...robotoFont,
            }}
          >
            ♰ оплата
            <br />
            ● оплата готовых украшений производится до отправки/встречи
            <br />
            ● украшения на заказ изготавливаются после полной предоплаты
            <br />
            <br />
            ♰ бронь
            <br />
            ● возможна бронь украшений (1/3 стоимости украшения или полная стоимость за доставку)
            <br />
            <br />
            ♰ доставка
            <br />
            ● бесплатная доставка почтой России по всей стране при сумме заказа от 1800₽. есть
            возможность отправки сдэком, стоимость доставки рассчитывается отдельно
            <br />
            ● самовывоз г. Комсомольск-на-Амуре
            <br />
            <br />
            ♰ возврат
            <br />
            ● возврат не осуществляется
            <br />
            <br />♰ бонусы
            <br />● для покупателей, совершивших от трёх покупок, действует постоянная скидка 10%
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            sx={{
              ...buttonStyles,
              margin: '0 auto',
              display: 'block',
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 'bold',
            }}
            onClick={onClose}
          >
            Закрыть
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default FAQModal;
