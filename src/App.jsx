import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { CoWriterContext } from './context';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu';
import Routes from './router/Routes';

import { initialState } from './state';

export default function App() {
    const [state, setState] = useState(initialState);

  useEffect(() => {
    const localStorageState = JSON.parse(localStorage.getItem('coWriterState'));
    if (localStorageState) {      
      setState(localStorageState);
    }
  }, []);

  return (
    <CoWriterContext.Provider value={{state, setState}}>
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
    </CoWriterContext.Provider>
  );
};
