import React from 'react';
import kundaliImage from '../components/Img/kundali.png'; 
import match from '../components/Img/matching1.png';

import murhurtham from '../components/Img/muhurtham.jpg';
import prashna from '../components/Img/ques.png';
import '../components/styles/Expertise.css';


function Expertises() {
  return (
    <div className="expertises">
      <h2>OUR EXPERTISES</h2>
      <div className="expertiseBlocks">
        <div className="expertiseBlock">
        <img src={kundaliImage} alt="Galaxy 1" />
          <p>Kundali focuses on meticulously analyzing astrological charts to understand the influence of celestial bodies at the time of birth to give insights.</p>
        </div>
        <div className="expertiseBlock">
          <img src={match} alt="Galaxy 2" />
          <p>Match making delves into the art of match-making by comparing horoscopes to ensure harmonious and compatible partnerships, guided by the stars,
          specializes in unraveling the cosmic tapestry to find stellar alignments that foster like  strong .
          </p>
        </div>
        <div className="expertiseBlock">
          <img src={murhurtham} alt="Galaxy 3" />
          <p>Muhurtham identifies the most auspicious timings, or Muhurtham, for significant events and rituals to harness the favorable celestial energies for success and prosperity.</p>
        </div>
        <div className="expertiseBlock">
          <img src={prashna} alt="Galaxy 4" />
          <p>Prashna Shastra expertise harnesses the power of real-time cosmic alignments to provide insightful answers and guidance for immediate life queries and decisions.</p>
        </div>
      </div>
    </div>
  );
}

export default Expertises;
