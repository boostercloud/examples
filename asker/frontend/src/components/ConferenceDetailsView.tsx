import React from 'react';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { QuestionsView } from './questions/QuestionsView';

export const ConferenceDetailsView = () => {
  const httpLink = new HttpLink({
    uri: localStorage.getItem('serverUrl')!,
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <QuestionsView />
    </ApolloProvider>
  );
};

