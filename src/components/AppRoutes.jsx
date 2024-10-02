import { Routes, Route, useLocation } from 'react-router-dom';
import Root from './Root';
import MainPage from './MainPage';
import CatalogPage from './Catalog/CatalogPage';
import MainButtonToCart from './Buttons/MainButtonToCart';
import CartPage from './Cart/CartPage';
import WelcomePage from './WelcomePage';
import JewelryDetailsPage from './Catalog/JewelryDetailsPage'; // Импортируем новый компонент

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route element={<Root />}>
          <Route index element={<WelcomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/jewelry/:id" element={<JewelryDetailsPage />} /> {/* Новый маршрут */}
          <Route path="*" />
        </Route>
      </Routes>
      {location.pathname !== '/cart' ? <MainButtonToCart /> : null}
    </>
  );
};

export default AppRoutes;
