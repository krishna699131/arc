// AccountDetailsPage.js
import React, { useState, useEffect } from 'react';
import '../components/styles/Homeheader.css';
import '../components/styles/Accountdetails.css';
import leftLogo from '../components/Img/chakra.png';
import rightLogo from '../components/Img/shanka2.png';
import SolarSystem from '../components/Homesolar'; // Update the import path if necessary
import Footer from '../components/Footer'; // Update the import path if necessary
import '../components/styles/HomesideElementsclick.css';


const AccountDetailsPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    if (username) {
      fetch(`http://localhost:5000/api/userdetails?username=${encodeURIComponent(username)}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setUserDetails(data.data);
          } else {
            setError(data.message);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setError(`Failed to fetch details: ${error.message}`);
          setIsLoading(false);
        });
    } else {
      setError('No username found in sessionStorage');
      setIsLoading(false);
    }
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleDetailChange = (e, detailKey) => {
    setUserDetails({ ...userDetails, [detailKey]: e.target.value });
  };

  const handleUpdateDetails = async () => {
    const response = await fetch('http://localhost:5000/api/updateaccountdetails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    });
    const data = await response.json();
    if (data.success) {
      alert('Details updated successfully');
      setEditMode(false);
    } else {
      alert('Failed to update details');
    }
  };


  if (isLoading) {
    return <div className="container-glass">Loading...</div>;
  }

  if (error) {
    return <div className="container-glass">Error: {error}</div>;
  }

  return (
    <div >
          <header className="header-container">
        <img src={leftLogo} alt="Left Logo" className="logo left-logo" />
        <h1 className="neon-title">SHREE VENKATESHWARA JYOTHESHYALAYAM</h1>
        <img src={rightLogo} alt="Right Logo" className="logo right-logo" />
      </header>
      <SolarSystem /> 
      <div className="container-glass">
    
      <h1>Account Details</h1>
      <div className="account-info">
          {/* Map through userDetails and dynamically create detail items */}
          {userDetails && Object.entries(userDetails).map(([key, value]) => (
            <div className="detail-item" key={key}>
              <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
              {editMode && key !== 'username' && key !== 'customerid' ? (
                <input type={key === 'password' ? 'password' : 'text'} value={value} onChange={(e) => handleDetailChange(e, key)} />
              ) : (
                <p>{key === 'password' ? '••••••' : value}</p>
              )}
            </div>
          ))}
        </div>
        <button className='update-details-btn' onClick={handleEditToggle}>{editMode ? 'Cancel' : 'Edit Details'}</button>
        {editMode && <button className='update-details-btn' onClick={handleUpdateDetails}>Update Details</button>}
      </div>


      <Footer />
    </div>
  );
};

export default AccountDetailsPage;
