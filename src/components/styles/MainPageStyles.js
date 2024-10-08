import backgroundImage from '../../assets/fon.jpg';
export const robotoFont = {
  fontFamily: '"Roboto", sans-serif',
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

export const heroSection = {
  position: 'relative',
  overflow: 'hidden',
  padding: '120px 0',
  textAlign: 'center',
  borderRadius: '0 0 40px 40px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.5)',
    zIndex: 1,
  },
};

export const buttonStyles = {
  backgroundColor: '#000',
  color: '#fff',
  borderRadius: 4,
  padding: '10px 20px',
  '&:hover, &:active': {
    backgroundColor: '#333',
  },
};

export const containerStyles = {
  position: 'relative', // Нужен для работы псевдоэлемента
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
    zIndex: 1, // Этот слой будет под контентом
  },
  zIndex: 2, // Контент будет выше псевдоэлемента с затемнением
};
