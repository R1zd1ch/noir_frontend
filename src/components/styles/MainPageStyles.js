// MainPageStyles.js
export const robotoFont = {
  fontFamily: '"Roboto", sans-serif',
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

export const heroSection = {
  position: 'relative',
  padding: '120px 0',
  textAlign: 'center',
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
