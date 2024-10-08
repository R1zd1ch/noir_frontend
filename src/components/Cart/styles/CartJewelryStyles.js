const cartJewelryStyles = {
  card: {
    height: '100%',
    backgroundColor: '#212121',
    color: '#FFFFFF',
    position: 'relative',
  },
  media: {
    objectFit: 'cover',
  },
  content: {
    height: '180px',
    overflow: 'hidden',
  },
  title: {
    whiteSpace: 'normal',
  },
  descriptionBox: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    color: 'white',
  },
  price: {
    color: 'primary',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    padding: '0 20px',
    height: '60px',
  },
  button: {
    color: '#FF0000',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default cartJewelryStyles;
