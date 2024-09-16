import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useWebApp, MainButton } from '@vkruglikov/react-telegram-web-app';
import Root from './Root';
import MainPage from './MainPage';
import CatalogPage from './CatalogPage';

const App = () => {
  const tg = useWebApp();

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
      <MainButton text="CLICK ME" onClick={() => console.log('Hello, I am button!')} />;
    </BrowserRouter>
  );
};

export default App;
