import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom';
import mainButtonStyles from './styles/MainButtonStyles'; // Импорт стилей кнопки

const MainButtonToCart = () => {
  const navigate = useNavigate();

  return (
    <MainButton
      text="TO CART"
      params={mainButtonStyles.darkTheme} // Применяем стили для тёмной темы
      onClick={() => navigate('/cart')}
    />
  );
};

export default MainButtonToCart;
