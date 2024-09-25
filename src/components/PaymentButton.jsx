import React, { useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useSelector } from 'react-redux';
import axios from 'axios';

const PaymentButton = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const tg = useWebApp();
  const cartItems = useSelector((state) => state.cart.items); // Получаем корзину из Redux

  useEffect(() => {
    // Рассчитываем общую сумму и преобразуем её в минимальные единицы (центы)
    const totalAmount = Math.round(
      cartItems.reduce((total, item) => total + item.jewelry.price, 0) * 100,
    );

    // Подготавливаем массив объектов с ценами для каждого товара
    const prices = cartItems.map((item) => ({
      label: item.jewelry.title,
      amount: Math.round(item.jewelry.price * 100), // Преобразуем цену в центы
    }));

    if (cartItems.length > 0) {
      tg.MainButton.setText(`Оплатить $${totalAmount / 100}`); // Отображаем сумму в долларах
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }

    const handlePayment = () => {
      // Отправляем данные на сервер для генерации инвойса
      axios
        .post(`${apiUrl}/api/payment`, {
          userId: '6933164806',
          prices, // Массив объектов с названиями и ценами
          totalAmount, // Общая сумма в центах
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
