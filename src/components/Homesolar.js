// Ensure the CSS is correctly set up for 3D styling

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/Homesolar.css'; // Ensure this path is correct for your project structure

const SolarSystem = () => {
    const navigate = useNavigate();

    const redirectTo = (path) => {
        navigate(path);
    };

  return (
    <section className="clearfix">
      <ul className="solarsystem">
        <li className="sun"><a href="#sun"><span>Sun</span></a></li>
        <li className="mercury"><a href="#mercury"><span>Mercury</span></a></li>
        <li className="venus"><a href="#venus"><span>Venus</span></a></li>
        <li className="earth"><a href="#earth"><span>Earth<span className="moon"> &amp; Moon</span></span></a></li>
        <li className="mars"><a href="#mars"><span>Mars</span></a></li>
        <li className="asteroids_meteorids"><span>Asteroids &amp; Meteorids</span></li>
        <li className="jupiter"><a href="#jupiter"><span>Jupiter</span></a></li>
        <li className="saturn"><a href="#saturn"><span>Saturn &amp; <span className="ring">Ring</span></span></a></li>
        <li className="uranus"><a href="#uranus"><span>Uranus</span></a></li>
        <li className="neptune"><a href="#neptune"><span>Neptune</span></a></li>
        <li className="pluto"><a href="#pluto"><span>Pluto</span></a></li>
      </ul>

      <ul id="descriptions">
        <li>
          <h2 id="Sun" onClick={() => redirectTo('/Account')}>Account Details</h2>
        </li>

        <li>
          <h2 id="next-add" onClick={() => redirectTo('/NextAdd')}>Next Add</h2>
        </li>
        <li>
          <h2 id="Horoscope" onClick={() => redirectTo('/Horoscope')}>Horoscope</h2>
        </li>
        <li>
          <h2 id="Live-Audio-Chat" onClick={() => redirectTo('/LiveChat')}>Live Audio Chat with Expert</h2>
        </li>
        <li>
          <h2 id="Subscriptions" onClick={() => redirectTo('/Subscriptions')}>Subscriptions</h2>
        </li>
        <li>
          <h2 id="About-us" onClick={() => redirectTo('/AboutUs')}>About Us</h2>
        </li>
        <li>
          <h2 id="Logout" onClick={() => redirectTo('/Landing')}>Logout</h2>
        </li>
      </ul>

    </section>
  );
};

export default SolarSystem;
