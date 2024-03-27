import React from 'react';
import Landing from '../src/components/landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Solarsignup from '../src/components/Signup';
import HomeHeader from '../src/components/HomeHeader';



function App(){
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Solarsignup />} />
      <Route path="/homeheader" element={<HomeHeader />} />
      {/* ...other routes */}
    </Routes>
  </Router>
    
  );
}

export default App;
