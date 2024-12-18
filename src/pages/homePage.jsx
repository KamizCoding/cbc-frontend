import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

export function Homepage() {
    return (
        <div className="homepage">
            <header className="header">
                <h1>Welcome to My Website</h1>
                <p>Your one-stop destination for all things awesome!</p>
                <button>Get Started</button>
            </header>
            <section className="features">
                <div className="feature">
                    <h2>Feature 1</h2>
                    <p>Discover amazing content curated just for you.</p>
                </div>
                <div className="feature">
                    <h2>Feature 2</h2>
                    <p>Stay updated with the latest trends and news.</p>
                </div>
                <div className="feature">
                    <h2>Feature 3</h2>
                    <p>Join a community of like-minded individuals.</p>
                </div>
                <Link to= "/login">Login</Link>
            </section>
            <footer className="footer">
                <p>&copy; 2024 My Website. All rights reserved.</p>
            </footer>
        </div>
    );
}
