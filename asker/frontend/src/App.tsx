import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { MainView } from './components/MainView';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

import { RefreshConection } from './common/helpers'
import { QuestionsView } from './components/questions/QuestionsView';

type AppRoutesProps = {
  onRefreshConection: RefreshConection
};

function AppRoutes(props: AppRoutesProps) {
  const protectedRoutes = () => {
    return (
      <>
        <Route path='/' element={<Navigate to='/conference' />} />
        <Route path='/conference' element={<MainView onRefreshConection={props.onRefreshConection} />} />
        <Route path='/conference/:conference' element={<QuestionsView />} />
      </>
    );
  };
  return <Routes>{protectedRoutes()}</Routes>;
}

function App() {
  const defaultClient = new ApolloClient({
    cache: new InMemoryCache(), link: new HttpLink({
      uri: localStorage.getItem('serverUrl') ?? ''
    })
  })

  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>(defaultClient)

  // This will allow us to refresh the apollo client on the flight
  const onRefreshConection: RefreshConection = (url: string) => {
    const httpLink = new HttpLink({
      uri: url,
    });

    setClient(new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    }));
  }

  return (
    <BrowserRouter>
      <Container>
        <ApolloProvider client={client}>
          <AppRoutes onRefreshConection={onRefreshConection} />
        </ApolloProvider>
      </Container>
    </BrowserRouter>
  );
}

export default App;
