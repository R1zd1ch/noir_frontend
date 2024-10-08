import { Routes, Route, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import Root from './Root';
import MainPage from './MainPage';
import CatalogPage from './Catalog/CatalogPage';
import MainButtonToCart from './Buttons/MainButtonToCart';
import CartPage from './Cart/CartPage';
import WelcomePage from './WelcomePage';
import JewelryDetailsPage from './Catalog/JewelryDetailsPage';
import NotFoundPage from './NotFoundPage'; // Компонент для страниц 404

const AppRoutes = () => {
  const location = useLocation();

  // Мемоизация excludedPaths для предотвращения лишних вычислений
  const excludedPaths = useMemo(() => ['/cart', '/some-other-page'], []);

  // Мемоизация проверки отображения MainButtonToCart
  const shouldShowCartButton = useMemo(
    () => !excludedPaths.includes(location.pathname),
    [location.pathname, excludedPaths],
  );

  return (
    <>
      <Routes>
        <Route element={<Root />}>
          <Route index element={<WelcomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/jewelry/:id" element={<JewelryDetailsPage />} />{' '}
          {/* Маршрут для детальной страницы украшений */}
          <Route path="*" element={<NotFoundPage />} /> {/* Маршрут для страницы 404 */}
        </Route>
      </Routes>
      {shouldShowCartButton && <MainButtonToCart />} {/* Условный рендеринг кнопки */}
    </>
  );
};

export default AppRoutes;
