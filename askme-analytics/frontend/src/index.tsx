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

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
