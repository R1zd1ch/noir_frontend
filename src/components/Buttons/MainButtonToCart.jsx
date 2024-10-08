import { useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom';

const MainButtonToCart = () => {
  const navigate = useNavigate();
  const tg = useWebApp();

  useEffect(() => {
    // Устанавливаем параметры кнопки
    tg.MainButton.setParams({
      text: 'TO CART',
      color: '#000000', // Чёрный фон
      text_color: '#FFFFFF', // Белый текст
      is_active: true, // Активируем кнопку
      is_visible: true, // Показываем кнопку
    });

    // Показать кнопку
    tg.MainButton.show();

    // Обработчик клика на кнопку
    const handleMainButtonClick = () => {
      navigate('/cart'); // Переход на страницу корзины
    };

    // Назначаем обработчик
    tg.MainButton.onClick(handleMainButtonClick);

    // Убираем обработчик при размонтировании компонента
    return () => {
      tg.MainButton.offClick(handleMainButtonClick);
      tg.MainButton.hide(); // Скрываем кнопку при выходе
    };
  }, [tg, navigate]);

  return null; // Компонент не рендерит ничего
};

export default MainButtonToCart;
