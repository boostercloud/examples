import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';

import App from './App';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundImage: 'linear-gradient(to right top, #3f51b5, #006CC6, #0080C5, #0091B5, #009E9D)',
          height: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        },
      },
    },
  },
});


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);

