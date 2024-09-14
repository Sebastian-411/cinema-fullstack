import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './main-page/MainPage';
import MoviesMain from './admin-page/movies/MoviesMain';
import ReservationMain from './admin-page/reservations/ReservationMain';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<MoviesMain />} />
        <Route path="/reservation" element={<ReservationMain />} />
      </Routes>
    </Router>
  );
}

export default App;
