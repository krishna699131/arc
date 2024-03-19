import React from 'react';
import '../components/styles/Privilages.css';

function UserPrivileges() {
  const handleKnowMoreClick = (userType) => {
    // Implement the redirection logic here
    console.log(userType + ' - Know more clicked');
    // Example: window.location.href = `/know-more/${userType}`;
  };

  // Function to handle click for Free Signup/Login button
  const handleFreeSignUpLoginClick = () => {
    // Implement the redirection logic here
    console.log('Free Signup/Login clicked');
    // Example: window.location.href = '/signup';
  };

  return (
    <div className="userPrivileges">
      <h2>USER PRIVILEGES</h2>
      <div className="privilegeContainer">
        <div className="privilege">
          <p>Free User</p>
          <p>Limited requests</p>
          <button onClick={handleFreeSignUpLoginClick}>Free Signup/Login</button>
        </div>
        <div className="privilege">
          <p>Silver User</p>
          <p>Limited time frame</p>
          <button onClick={() => handleKnowMoreClick('silver')}>Know More</button>
        </div>
        <div className="privilege">
          <p>Gold User</p>
          <p>UnLimited time frame</p>
          <button onClick={() => handleKnowMoreClick('gold')}>Know More</button>
        </div>
      </div>
    </div>
  );
}

export default UserPrivileges;
