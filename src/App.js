import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage';
import RouteInfo from './pages/RouteInfo';

function App() {
  return (
    <BrowserRouter>
      <div className='navbar'>
        <h1>NexTrip</h1>
        <Link to="/" className='home-link'>Home</Link>

      </div>
      <div className='body'>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/nextrip" element={<RouteInfo />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
