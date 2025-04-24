import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Collections from './components/HomeComponents/js/Collections.js';
import LookDetail from './components/HomeComponents/js/LookDetail.js';
import StylistList from './components/HomeComponents/js/StylistList.js';

// Comment out the entire GlobalStyle block
/*
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #0A0A0A;
    color: #FFFFFF;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;
*/

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0A0A0A',
      paper: '#1A1A1A',
    },
    primary: {
      main: '#FFFFFF',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Collections />} />
          <Route path="/look/:id" element={<LookDetail />} />
          <Route path="/stylists" element={<StylistList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;