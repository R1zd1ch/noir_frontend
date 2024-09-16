// import i18next from 'i18next';
// import { I18nextProvider, initReactI18next } from 'react-i18next';
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { Provider } from 'react-redux';
import { store } from './slices/index';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './components/App';
import theme from './theme/theme';
// import resources from './locales/index.js';

const init = async () => {
  // const i18n = i18next.createInstance();

  // await i18n.use(initReactI18next).init({
  //   resources,
  //   fallbackLng: 'ru',
  // });

  return (
    <WebAppProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          {/* <I18nextProvider i18n={i18n}> */}
          <App />
          {/* </I18nextProvider> */}
        </Provider>
      </ThemeProvider>
    </WebAppProvider>
  );
};

export default init;
