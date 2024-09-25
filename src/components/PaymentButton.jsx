import React, { useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useSelector } from 'react-redux';
import axios from 'axios';

const PaymentButton = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const tg = useWebApp();
  const cartItems = useSelector((state) => state.cart.items); // Получаем корзину из Redux

  useEffect(() => {
    const totalAmount = cartItems.reduce((total, item) => total + item.jewelry.price, 0);

    if (cartItems.length > 0) {
      tg.MainButton.setText(`Оплатить $${totalAmount}`);
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }

    const handlePayment = () => {
      // Отправляем данные на сервер для генерации инвойса
      axios
        .post(`${apiUrl}/api/payment`, {
          userId: '6933164806',
          items: cartItems,
          totalAmount,
        })
        .then((response) => {
          console.log('Инвойс отправлен на оплату через бота');
        })
        .catch((error) => {
          console.error('Ошибка создания инвойса:', error);
        });
    };

    tg.MainButton.onClick(handlePayment);

    return () => {
      tg.MainButton.offClick(handlePayment);
    };
  }, [cartItems, tg]);

  return null;
};

export default PaymentButton;
