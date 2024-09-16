import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom';

const MainButtonToCart = () => {
  const navigate = useNavigate();

  return <MainButton text="TO CART" onClick={() => navigate('/catalog')} />;
};

export default MainButtonToCart;
