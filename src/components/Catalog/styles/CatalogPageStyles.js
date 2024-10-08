// catalogPageStyles.js
const catalogPageStyles = {
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
  complainText: {
    color: 'white',
  },
  complainButton: {
    marginLeft: 1,
  },
  retryButton: {
    marginTop: 2,
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
  },
  noItemsText: {
    color: 'white',
  },
  pageContainer: {
    minHeight: '808px',
    padding: 2,
  },
  itemsContainer: {
    minHeight: '808px',
  },
  itemsTitle: {
    color: 'white',
    paddingBottom: 2,
  },
  paginationBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 2,
  },
};

export default catalogPageStyles;
