import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage';
import Departures from './pages/Departures';

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
        <Route path="/departures/:route/:direction/:stop" element={<Departures />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
