import { keyframes } from '@mui/system';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0.9;
    transform: scale(0.9);
  }
`;

const cartPageStyles = {
  loadingBox: {
    minHeight: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorBox: {
    minHeight: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  emptyCartBox: {
    minHeight: '606px',
  },
  emptyCartText: {
    marginTop: '4rem',
  },
  cartContainer: {
    minHeight: '808px',
    padding: '16px',
  },
  cartTitle: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  itemsContainer: {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  paginationBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
  },
};

export default cartPageStyles;
