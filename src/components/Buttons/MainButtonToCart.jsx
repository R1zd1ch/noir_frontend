import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom';
import mainButtonStyles from './styles/MainButtonStyles'; // Импорт стилей кнопки

const MainButtonToCart = () => {
  const navigate = useNavigate();

  return (
    <MainButton
      text="TO CART"
      params={{
        color: '#000000', // Белый текст
        text_color: '#FFFFFF', // Чёрный текст кнопки (можно кастомизировать)
        is_active: true, // Активируем кнопку
        is_visible: true, // Отображаем кнопку
      }} // Применяем стили для тёмной темы
      onClick={() => navigate('/cart')}
    />
  );
};

export default MainButtonToCart;
