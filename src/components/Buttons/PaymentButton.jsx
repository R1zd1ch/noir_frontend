import { useEffect, useState } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import axios from 'axios';
import MainButtonStyles from './styles/PaymentButtonStyles'; // Импорт стилей кнопки

const PaymentButton = ({ totalAmount }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const tg = useWebApp();
  const [isLoading, setIsLoading] = useState(false); // Состояние ожидания загрузки

  useEffect(() => {
    if (totalAmount > 0) {
      tg.MainButton.setText(`Оплатить ${totalAmount} ₽`);
      tg.MainButton.setParams({
        ...MainButtonStyles.darkTheme, // Применяем стили для тёмной темы
        text: `Оплатить ${totalAmount} ₽`, // Динамически меняем текст кнопки
      });
      tg.MainButton.show();
    } else {
      tg.MainButton.setParams(MainButtonStyles.hidden); // Скрываем кнопку, если сумма = 0
      tg.MainButton.hide();
    }

    const handlePayment = () => {
      setIsLoading(true); // Устанавливаем состояние ожидания

      axios
        .post(`${apiUrl}/api/payment`, {
          userName: tg.initDataUnsafe.user.username,
          userId: tg.initDataUnsafe.user.id, // ID пользователя Telegram
          totalAmount,
        })
        .then((response) => {
          const { status } = response.data;

          if (status === 'ok') {
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
  }, [totalAmount, tg, apiUrl, isLoading]);

  return null; // Компонент не рендерит ничего на странице
};

export default PaymentButton;
