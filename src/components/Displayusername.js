import React from 'react';
import '../components/styles/usernameDisplay.css';

const UsernameDisplay = () => {
    const username = sessionStorage.getItem('username') || 'Guest';

    return (
        <div className="username-display">
            Welcome, {username}
        </div>
    );
};

export default UsernameDisplay;

