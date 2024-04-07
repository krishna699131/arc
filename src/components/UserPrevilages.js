import React from 'react';
import '../components/styles/Privilages.css';
import { useNavigate  } from 'react-router-dom';




  function UserPrivileges() {
    const navigate = useNavigate(); // Hook for navigation
  
    const navigateTo = (path) => {
      navigate(path);
    }
    const handleKnowMoreClick = (userType) => {
      // Implement the redirection logic here
      console.log(userType + ' - Know more clicked');
      // Example: window.location.href = `/know-more/${userType}`;
    }
  


  return (
    <div className="userPrivileges">
      <h2>USER PRIVILEGES</h2>
      <div className="privilegeContainer">
        <div className="privilege">
          <p>Free User</p>
          <p>Limited requests</p>
          <button onClick={() => navigateTo('/login')}>Free Signup/Login</button>
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
