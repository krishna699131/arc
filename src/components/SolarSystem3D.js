import React from 'react';
import '../components/styles/SolarSystem3D.scss'; // Ensure the CSS is correctly set up for 3D styling

const SolarSystem3D = () => {
  // Data for the solar system planets
  const solarSystemData = [
    { name: 'Sun', color: '#FDE528', className: 'sun' },
    { name: 'Mercury', color: '#C1B4AC', className: 'mercury' },
    { name: 'Venus', color: '#F2D299', className: 'venus' },
    { name: 'Earth', color: '#05f', className: 'earth' },
    { name: 'Mars', color: '#E67E5A', className: 'mars' },
    { name: 'Jupiter', color: '#C5AA96', className: 'jupiter' },
    { name: 'Saturn', color: '#AF9D8E', className: 'saturn' },
    { name: 'Uranus', color: '#C2E8EA', className: 'uranus' },
    { name: 'Neptune', color: '#5C92F0', className: 'neptune' }
  ];

  // Generate the solar system structure as JSX
  const renderSolarSystem = () => {
    return solarSystemData.map((planet, index) => (
      <div key={planet.name} className={`orbit ${planet.className}`}>
        <div className="planet" style={{ backgroundColor: planet.color }}>
          <span>{planet.name}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="scene">
      <div className="system">
        {renderSolarSystem()}
      </div>
    </div>
  );
};

export default SolarSystem3D;
