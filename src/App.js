import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarCode from './components/BarCodes/BarCode';
import AllBarCodes from './components/AllBarCodes/AllBarCodes';
import Nav from './components/Nav/Nav';

function App() {
  useEffect(() => {
    if (localStorage.getItem('data_arr') == undefined) {
      localStorage.setItem('data_arr', JSON.stringify([]));
    }
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<BarCode />}/>
        <Route path='/all-bar-codes' element={<AllBarCodes />}/>
      </Routes>
    </Router>
  );
}

export default App;
