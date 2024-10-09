import backgroundImage from '../../assets/welcomePageIphone.png';

const welcomePageStyles = {
  loaderContainer: {
    minHeight: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    color: 'red',
  },
  pageContainer: {
    minHeight: '100vh',
    marginTop: '20px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    textAlign: 'center',
  },
  joinButton: {
    marginTop: 3,
    zIndex: 2,
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '350px',
    padding: 3,
    margin: 1,
    position: 'relative', // Нужен для работы псевдоэлемента
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '0 0 60px 60px',
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
    zIndex: 2,
  },
  textStyle: {
    position: 'absolute',
    top: '10%', // Центрируем по вертикали
    left: '50%', // Центрируем по горизонтали
    transform: 'translate(-50%, -50%)', // Сдвигаем на половину ширины и высоты, чтобы центрировать
    color: '#fff', // Цвет текста
    zIndex: 2, // Текст будет поверх псевдоэлемента
    textAlign: 'center',
    width: '100%',
    lineHeight: 1.2,
  },
};

export default welcomePageStyles;
