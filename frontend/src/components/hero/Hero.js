import React from 'react'
import Auth from '../auth/Auth';
import './Hero.css';

export default function Hero() {
    return (
        <div className="container-fluid p-6">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-5 mb-4 mb-lg-0 d-flex justify-content-center">
                    <img src="hero.png" alt="Hero Image" className="img-fluid"/>
                </div>   
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center text-center">
                    <div className="elegantText mb-4">
                        <strong>Elevate...</strong> Your Project Management
                    </div>
                    <div className="authContainer">
                        <Auth />
                    </div>
                </div>
            </div>
        </div>
    );
}
