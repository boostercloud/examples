import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ConferenceView } from './components/ConferenceView';
import { ConferenceDetailsView } from './components/ConferenceDetailsView';

function AppRoutes() {
  const protectedRoutes = () => {
    return (
      <>
        <Route path='/' element={<Navigate to='/conference' />} />
        <Route path='/conference' element={<ConferenceView />} />
        <Route path='/conference/:conference' element={<ConferenceDetailsView />} />
      </>
    );
  };
  return <Routes>{protectedRoutes()}</Routes>;
}

function App() {
  return (
    <BrowserRouter>
      <Container>
        <AppRoutes />
      </Container>
    </BrowserRouter>
  );
}

export default App;
