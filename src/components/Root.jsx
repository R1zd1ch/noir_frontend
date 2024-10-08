import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';
import rootStyles from './styles/RootStyles'; // Импортируем стили

const Root = () => (
  <Box sx={rootStyles.rootContainer}>
    <NavBar />
    <Box sx={rootStyles.contentContainer}>
      <Outlet />
      <Footer />
    </Box>
  </Box>
);

export default Root;
