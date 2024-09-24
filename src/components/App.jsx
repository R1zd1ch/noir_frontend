import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';
import Root from './Root';
import MainPage from './MainPage';
import CatalogPage from './CatalogPage';
import MainButtonToCart from './MainButtonToCart';
import CartPage from './CartPage';
import WelcomePage from './WelcomePage';

const AppContent = () => {
  const location = useLocation(); // Используем useLocation внутри компонента

  return (
    <>
      <Routes>
        <Route element={<Root />}>
          <Route index element={<WelcomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" />
        </Route>
      </Routes>
      {/* Условный рендеринг */}
      {location.pathname !== '/cart' ? <MainButtonToCart /> : null}
    </>
  );
};

const App = () => {
  const tg = useWebApp();

  useEffect(() => {
    if (tg.initData) {
      tg.ready();
    }
  }, [tg]);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
