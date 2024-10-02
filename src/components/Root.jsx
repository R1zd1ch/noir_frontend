import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';

const Root = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      MinHeight: '100vh',
    }}
  >
    <NavBar />
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        marginTop: '80px',
      }}
    >
      <Outlet />
      <Footer />
    </Box>
  </Box>
);

export default Root;
