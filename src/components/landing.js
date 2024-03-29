    import React from 'react';
    import '../components/styles/landing.css';
    import Header from '../components/Header';
    import Expertises from '../components/Experties';
    import UserPrivileges from '../components/UserPrevilages';
    import Footer from '../components/Footer';
    import SolarSystem from '../components/SolarSystem';

    function Landing() {
    return (
        <div className="App">
        
        <Header />
        <SolarSystem />
        <Expertises />
        <UserPrivileges />
        <Footer />
        </div>
    );
    }

    export default Landing;
