import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './route/PrivateRoute';
import AdminPage from './admin-page/AdminPage';
import MainPage from './main-page/MainPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={<PrivateRoute element={<AdminPage />} />}
          />
          <Route path="*" element={<Login />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
