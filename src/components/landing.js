    import React from 'react';
    import '../components/styles/landing.css';
    import Header from '../components/Header';
    import Expertises from '../components/Experties';
    import UserPrivileges from '../components/UserPrevilages';
    import Footer from '../components/Footer';
    import SolarSystem3D from '../components/SolarSystem3D';

    function Landing() {
    return (
        <div className="App">
        <div className="sideHover">
            <div className="sideHoverContent">
            <ul>
                <li>Login</li>
                <li>Signup</li>
                <li>Register</li>
            </ul>
            </div>
        </div>
        <Header />
        <SolarSystem3D />
        <Expertises />
        <UserPrivileges />
        <Footer />
        </div>
    );
    }

    export default Landing;
