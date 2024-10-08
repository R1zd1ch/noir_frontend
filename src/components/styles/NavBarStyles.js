const navBarStyles = (theme) => ({
  appBar: {
    backgroundColor: theme.palette.backgroundAppBar.default,
    color: theme.palette.text.primary,
    boxShadow: 50,
  },
  toolbar: {
    height: '75px',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '60px',
    height: '60px',
    borderRadius: '10px',
  },
  title: {
    fontSize: '36px',
    marginLeft: '10px',
  },
  navButtons: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-around',
    marginLeft: '15px',
  },
  cartButton: {
    display: 'flex',
  },
  cartIcon: {
    color: 'white',
    marginLeft: '10px',
  },
});

export default navBarStyles;
