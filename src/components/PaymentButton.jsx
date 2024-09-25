import React, { useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useSelector } from 'react-redux';
import axios from 'axios';

const PaymentButton = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const tg = useWebApp();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const totalAmount = Math.round(
      cartItems.reduce((total, item) => total + item.jewelry.price, 0) * 100,
    );

    const prices = cartItems.map((item) => ({
      label: item.jewelry.title,
      amount: Math.round(item.jewelry.price * 100),
    }));

    if (cartItems.length > 0) {
      tg.MainButton.setText(`Оплатить $${totalAmount / 100}`);
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }

    const handlePayment = () => {
      // Отправляем данные на сервер для генерации инвойса
      axios
        .post(`${apiUrl}/api/payment`, {
          userId: tg.initDataUnsafe.user.id, // Используем текущий userId из Telegram Web App
          prices,
          totalAmount,
        })
        .then((response) => {
          const { invoice_payload } = response.data; // Получаем payload инвойса из ответа сервера

          if (invoice_payload) {
            // Открываем окно оплаты через Telegram Web App
            tg.openInvoice(invoice_payload);
          } else {
            console.error('Ошибка: не удалось получить payload инвойса');
          }
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
