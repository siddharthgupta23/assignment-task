import React from 'react';
import '../scss/Home.scss'; // Ensure you have the styles defined for this component

const Home = () => {
    return (
        <div>
            <div className="navbar">
                <div className="navbar-logo">
                    <h2>MyApp</h2>
                </div>
                <div className="navbar-links">
                    <a href="/">Home</a>
                    <a href="/login">Login</a>
                    <a href="/signup">Signup</a>
                </div>
            </div>
            <div className="content">
                <h1>Welcome to Home Page</h1>
            </div>
        </div>
    );
};

export default Home;
