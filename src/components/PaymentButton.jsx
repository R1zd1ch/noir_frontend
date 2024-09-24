import React, { useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useSelector } from 'react-redux';

const PaymentButton = () => {
  const tg = useWebApp();
  const cartItems = useSelector((state) => state.cart.items); // Получаем корзину из Redux

  useEffect(() => {
    const totalAmount = cartItems.reduce((total, item) => total + item.jewelry.price, 0);

    // Обновляем текст кнопки с общей суммой
    if (cartItems.length > 0) {
      tg.MainButton.setText(`Оплатить $${totalAmount}`);
      tg.MainButton.show();
    } else {
      tg.MainButton.hide(); // Прячем кнопку, если корзина пуста
    }

    const handlePayment = () => {
      const invoiceData = {
        title: 'Оплата заказа',
        description: 'Оплата за выбранные ювелирные изделия',
        payload: 'Custom-Payload',
        provider_token: 'TEST:12345', // Тестовый токен провайдера
        start_parameter: 'pay',
        currency: 'USD',
        prices: cartItems.map((item) => ({
          label: item.jewelry.title,
          amount: Math.round(item.jewelry.price * 100), // Цена в копейках
        })),
      };

      tg.showInvoice(invoiceData, (status) => {
        if (status === 'ok') {
          console.log('Платеж успешно выполнен');
        } else {
          console.log('Ошибка при оплате');
        }
      });
    };

    tg.MainButton.onClick(handlePayment);

    return () => {
      tg.MainButton.offClick(handlePayment); // Чистим обработчик при размонтировании
    };
  }, [cartItems, tg]);

  return null; // Этот компонент не рендерит UI, он только управляет кнопкой
};

export default PaymentButton;
