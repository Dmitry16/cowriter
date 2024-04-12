import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu';
import Routes from './router/Routes';

export default function App() {
  return (
    <Container maxWidth="lg" height="100vh"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Menu />
          <Routes />
        </Box>
        <Footer />
    </Container>
  );
};
