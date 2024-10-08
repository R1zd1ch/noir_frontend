// jewelryCardStyles.js
const jewelryCardStyles = {
  card: {
    height: '100%',
    backgroundColor: '#212121',
    color: '#FFFFFF',
    position: 'relative',
    cursor: 'pointer',
    borderRadius: '15px',
  },
  media: {
    objectFit: 'cover',
  },
  content: {
    height: '180px',
    overflow: 'hidden',
  },
  title: {
    fontSize: '21px',
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
    color: '#00FF00',
  },
  soldOutText: {
    color: 'error',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    padding: '0 15px',
    height: '60px',
  },
  addButton: (isAddHovered) => ({
    color: '#00FF00',
    backgroundColor: isAddHovered ? '#4CFF4C' : '#000',
    borderRadius: '12px',
    padding: '10px 20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
  }),
  removeButton: (isRemoveHovered) => ({
    color: '#FF0000',
    backgroundColor: isRemoveHovered ? '#FF4C4C' : '#000',
    borderRadius: '12px',
    padding: '10px 20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
  }),
};

export default jewelryCardStyles;
