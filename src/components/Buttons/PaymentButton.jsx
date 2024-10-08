import { useEffect, useState } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useSelector } from 'react-redux';
import { selectTotalAmount } from '../../slices/cartSlice';
import axios from 'axios';
import MainButtonStyles from './styles/MainButtonStyles'; // Импорт стилей кнопки

const PaymentButton = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const tg = useWebApp();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector(selectTotalAmount); // Получаем сумму корзины из Redux

  const [isLoading, setIsLoading] = useState(false); // Состояние ожидания загрузки

  useEffect(() => {
    const prices = cartItems.map((item) => ({
      label: item.jewelry.title,
      amount: item.jewelry.price,
    }));

    if (cartItems.length > 0) {
      tg.MainButton.setText(`Оплатить ${totalAmount} ₽`);
      tg.MainButton.setParams({
        ...MainButtonStyles.darkTheme, // Применяем стили для тёмной темы
        text: `Оплатить ${totalAmount} ₽`, // Динамически меняем текст кнопки
      });
      tg.MainButton.show();
    } else {
      tg.MainButton.setParams(MainButtonStyles.hidden); // Скрываем текст, если корзина пуста
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
            if (!isLoading) {
              tg.close();
            }
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
  }, [cartItems, tg, apiUrl, isLoading, totalAmount]);

  return null; // Компонент не рендерит ничего на странице
};

export default PaymentButton;
