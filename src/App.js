import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import Catalog from './pages/Catalog';
import NavBar from './components/NavBar';
import GameDetail from './pages/GameDetail';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Catalog/>}/>
        <Route path='/game/:id' element={<GameDetail/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
