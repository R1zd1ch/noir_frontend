import React, { useEffect, useState } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useSelector } from 'react-redux';
import axios from 'axios';

const PaymentButton = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const tg = useWebApp();
  const cartItems = useSelector((state) => state.cart.items);
  const [isLoading, setIsLoading] = useState(false); // Состояние ожидания загрузки

  useEffect(() => {
    const totalAmount = Math.round(
      cartItems.reduce((total, item) => total + item.jewelry.price, 0) * 100,
    );

    const prices = cartItems.map((item) => ({
      label: item.jewelry.title,
      amount: Math.round(item.jewelry.price * 100),
    }));

    if (cartItems.length > 0) {
      tg.MainButton.setText(`Оплатить ${totalAmount / 100} ₽`);
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }

    const handlePayment = () => {
      setIsLoading(true); // Устанавливаем состояние ожидания

      axios
        .post(`${apiUrl}/api/payment`, {
          userName: tg.initDataUnsafe.user.username,
          userId: tg.initDataUnsafe.user.id, // ID пользователя Telegram
          prices,
          totalAmount,
        })
        .then((response) => {
          const { status } = response.data;

          if (status === 'ok') {
            // Закрываем WebApp перед открытием оплаты
            tg.close();
          } else {
            console.error('Ошибка: не удалось получить данные');
          }
        })
        .catch((error) => {
          console.error('Ошибка создания инвойса:', error);
        })
        .finally(() => {
          setIsLoading(false); // Сбрасываем состояние ожидания после получения ответа
        });
    };

    tg.MainButton.onClick(handlePayment);

    return () => {
      tg.MainButton.offClick(handlePayment);
    };
  }, [cartItems, tg]);

  return null; // Компонент не рендерит ничего на странице
};

export default PaymentButton;
