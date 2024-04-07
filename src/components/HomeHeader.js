import React from 'react';
import '../components/styles/Homeheader.css';
import leftLogo from '../components/Img/chakra.png';
import rightLogo from '../components/Img/shanka2.png';
import SolarSystem from '../components/Homesolar'; // Update the import path if necessary
import Footer from '../components/Footer'; // Update the import path if necessary


const HomeHeader = () => {
  return (
    <div>
      <header className="header-container">
        <img src={leftLogo} alt="Left Logo" className="logo left-logo" />
        <h1 className="neon-title">SHREE VENKATESHWARA JYOTHESHYALAYAM</h1>
        <img src={rightLogo} alt="Right Logo" className="logo right-logo" />
      </header>
      
      <SolarSystem /> 
      <Footer />
    </div>
  );
};

export default HomeHeader;
