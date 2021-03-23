import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';

import App from './App';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  }
});


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);

