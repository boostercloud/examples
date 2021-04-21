import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';

console.log(import.meta.env.SNOWPACK_PUBLIC_WS_URL);

const wsLink = new WebSocketLink({
  uri: import.meta.env.SNOWPACK_PUBLIC_WS_URL!,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: import.meta.env.SNOWPACK_PUBLIC_API_URL!,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

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
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
