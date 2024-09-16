import { createTheme } from '@mui/material/styles';

// Создаем тему
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF', // Основной цвет (например, синий)
    },
    secondary: {
      main: '#ffffff', // Вторичный цвет (например, красный)
    },
    background: {
      default: '#48494a', // Цвет фона по умолчанию
    },
    text: {
      primary: '#FFFFFF', // Цвет текста
    },
    backgroundAppBar: {
      default: '#212121',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Шрифты
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;
