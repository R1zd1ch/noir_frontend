import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './Root';
import MainPage from './MainPage';
import CatalogPage from './CatalogPage';
import MainButtonToCart from './MainButtonToCart';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Root />}>
          <Route index></Route>
          <Route path="/main" element={<MainPage />}></Route>
          <Route path="/catalog" element={<CatalogPage />}></Route>
          <Route path="*"></Route>
        </Route>
      </Routes>
      <MainButtonToCart></MainButtonToCart>
    </BrowserRouter>
  );
};

export default App;
