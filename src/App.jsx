import { BrowserRouter } from 'react-router-dom';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './slices/userSlice';
import AppRoutes from './components/AppRoutes';
import BackgroundImage from './components/BackgroundImage';

const App = () => {
  const tg = useWebApp();
  const dispatch = useDispatch();
  const telegramId = tg.initDataUnsafe?.user?.id.toString() || '6933164806';
  const username = tg.initDataUnsafe?.user?.username || 'r1zzd';
  const firstName = tg.initDataUnsafe?.user?.first_name || 'r1zzd';
  const lastName = tg.initDataUnsafe?.user?.last_name || '';
  const languageCode = tg.initDataUnsafe?.user?.language_code || 'ru';
  const isBot = tg.initDataUnsafe?.user?.is_bot || false;

  const userData = useMemo(
    () => ({
      telegramId,
      username,
      firstName,
      lastName,
      languageCode,
      isBot,
    }),
    [telegramId, username, firstName, lastName, languageCode, isBot],
  );

  useEffect(() => {
    if (telegramId) {
      dispatch(fetchUser(userData));
    }
  }, [dispatch, telegramId, userData]);

  useEffect(() => {
    if (tg.initData) {
      tg.ready();
    }
  }, [tg]);

  return (
    <BrowserRouter>
      <BackgroundImage />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
