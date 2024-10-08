import { useEffect, useState } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useSelector } from 'react-redux';
import axios from 'axios';

const PaymentButton = ({ totalAmount }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const tg = useWebApp();
  const cartItems = useSelector((state) => state.cart.items);
  const [isLoading, setIsLoading] = useState(false); // Состояние ожидания загрузки

  useEffect(() => {
    const prices = cartItems.map((item) => ({
      label: item.jewelry.title,
      amount: item.jewelry.price,
    }));

    if (cartItems.length > 0) {
      // Обновляем параметры кнопки при каждом изменении товаров в корзине
      tg.MainButton.setText(`Оплатить ${totalAmount} ₽`);
      tg.MainButton.setParams({
        color: '#000000', // Чёрный фон
        text_color: '#FFFFFF', // Белый текст
        is_active: true, // Активируем кнопку
        is_visible: true, // Отображаем кнопку
      });
      tg.MainButton.show(); // Показываем кнопку

      // Назначаем обработчик клика только после показа кнопки
      const handlePayment = () => {
        if (!isLoading) {
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
        }
      };

      tg.MainButton.onClick(handlePayment); // Назначаем обработчик клика

      // Удаляем обработчик клика при размонтировании
      return () => {
        tg.MainButton.offClick(handlePayment);
        tg.MainButton.hide(); // Скрываем кнопку при размонтировании
      };
    } else {
      // Если корзина пуста, скрываем кнопку
      tg.MainButton.hide();
    }
  }, [cartItems, totalAmount, tg, apiUrl, isLoading]); // Добавляем зависимости

  return null; // Компонент не рендерит ничего на странице
};

export default PaymentButton;
