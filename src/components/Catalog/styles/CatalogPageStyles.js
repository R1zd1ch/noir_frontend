// catalogPageStyles.js
import zIndex from '@mui/material/styles/zIndex';
import backgroundImage from '../../../assets/catalogFon.jpg';
import { borderRadius, height } from '@mui/system';

const catalogPageStyles = {
  loadingBox: {
    minHeight: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Чтобы быть выше затемнения
    zIndex: 3, // Обеспечивает расположение поверх затемненного фона
  },
  errorBox: {
    minHeight: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 3, // Поверх затемнения
  },
  complainText: {
    color: 'white',
    position: 'relative',
    zIndex: 3,
  },
  complainButton: {
    marginLeft: 1,
    position: 'relative',
    zIndex: 3,
  },
  retryButton: {
    marginTop: 2,
    position: 'relative',
    zIndex: 3,
  },
  noItemsBox: {
    minHeight: '550px',
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 2,
    position: 'relative',
    zIndex: 3,
  },
  noItemsText: {
    color: 'white',
    position: 'relative',
    zIndex: 3,
  },
  pageContainer: {
    position: 'relative', // Для корректной работы псевдоэлемента
    minHeight: '808px',
    padding: 2,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный чёрный слой
      zIndex: 1,
    },
    zIndex: 2, // Контент будет выше фона
  },
  itemsContainer: {
    minHeight: '808px',
    position: 'relative',
    zIndex: 3, // Поверх затемнения
  },
  itemsTitle: {
    color: 'white',
    paddingBottom: 2,
    position: 'relative',
    zIndex: 3,
  },
  paginationBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 2,
    position: 'relative',
    zIndex: 3,
  },
  selectBox: {
    display: 'flex',
    justifyContent: 'center',
    width: '125px',
    height: '50px',
    zIndex: 300,
  },
  menuProps: {
    PaperProps: {
      sx: {
        bgcolor: 'black', // Цвет фона выпадающего меню
        color: 'white', // Цвет текста элементов меню
        borderRadius: '0 0 20px 20px',
      },
    },
  },
};

export default catalogPageStyles;
