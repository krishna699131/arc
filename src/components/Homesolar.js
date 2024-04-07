import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../components/styles/Homesolar.css';
import UsernameDisplay from '../components/Displayusername';
import '../components/styles/HomesideElementsclick.css';

const SolarSystem = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (path) => {
    return location.pathname === path;
  };

  const handleRedirect = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/', { replace: true });
  };

  return (
    <section className="clearfix">
      <ul className="solarsystem">
        <li className="sun"><a href="#sun"><span>Sun</span></a></li>
        <li className="mercury"><a href="#mercury"><span>Mercury</span></a></li>
        <li className="venus"><a href="#venus"><span>Venus</span></a></li>
        <li className="earth"><a href="#earth"><span>Earth<span className="moon">&amp; Moon</span></span></a></li>
        <li className="mars"><a href="#mars"><span>Mars</span></a></li>
        <li className="asteroids_meteorids"><span>Asteroids &amp; Meteorids</span></li>
        <li className="jupiter"><a href="#jupiter"><span>Jupiter</span></a></li>
        <li className="saturn"><a href="#saturn"><span>Saturn<span className="ring">Ring</span></span></a></li>
        <li className="uranus"><a href="#uranus"><span>Uranus</span></a></li>
        <li className="neptune"><a href="#neptune"><span>Neptune</span></a></li>
        <li className="pluto"><a href="#pluto"><span>Pluto</span></a></li>
      </ul>

      <ul id="descriptions">
        <UsernameDisplay />
        <li>
          <h2
            id="AccountDetails"
            className={isSelected('/accountdetailspage') ? 'selected' : ''}
            onClick={() => handleRedirect('/accountdetailspage')}
          >
            Account Details
          </h2>
        </li>
        <li>
          <h2 id="next-add" onClick={() => handleRedirect('/NextAdd')}>Next Add</h2>
        </li>
        <li>
          <h2 id="Horoscope" onClick={() => handleRedirect('/Horoscope')}>Horoscope</h2>
        </li>
        <li>
          <h2 id="Live-Audio-Chat" onClick={() => handleRedirect('/LiveChat')}>Live Audio Chat with Expert</h2>
        </li>
        <li>
          <h2 id="Subscriptions" onClick={() => handleRedirect('/Subscriptions')}>Subscriptions</h2>
        </li>
        <li>
          <h2 id="About-us" onClick={() => handleRedirect('/AboutUs')}>About Us</h2>
        </li>
        <li>
          <h2 id="Logout" onClick={handleLogout}>Logout</h2>
        </li>
      </ul>
    </section>
  );
};

export default SolarSystem;
