const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#1C1C1C',
    color: '#FFFFFF',
    minHeight: '500px',
  },
  imageContainer: {
    textAlign: 'center',
  },
  image: {
    maxHeight: '280px',
    objectFit: 'cover',
    margin: '0 auto',
  },
  title: {
    marginTop: '20px',
  },
  price: {
    color: '#3f51b5',
  },
  description: {
    marginTop: '20px',
  },
  soldOutText: {
    marginTop: '10px',
    color: '#f44336',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  prevArrow: {
    position: 'absolute',
    left: '10px',
    zIndex: 2,
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  },
  nextArrow: {
    position: 'absolute',
    right: '10px',
    zIndex: 2,
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  },
  backButton: {
    position: 'absolute',
    zIndex: 3,
    top: '90px',
    left: '0px',
    color: 'white',
    borderRadius: 1.5,
    height: '50px',
    width: '50px',
    scale: 1.5,
  },
};

export default styles;
