import { BrowserRouter } from 'react-router-dom';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';
import AppRoutes from './components/AppRoutes';

const App = () => {
  const tg = useWebApp();

  useEffect(() => {
    if (tg.initData) {
      tg.ready();
    }
  }, [tg]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
