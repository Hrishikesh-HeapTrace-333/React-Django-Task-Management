import React from 'react'
import Auth from '../auth/Auth';
import './Hero.css';

export default function Hero() {
    return (
        <div className="container-fluid bg-light p-5">
            <div className="row align-items-center">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <img src="hero.png" alt="Hero Image" className="img-fluid"/>
                </div>   
                <Auth/>
            </div>
        </div>
    );
}
