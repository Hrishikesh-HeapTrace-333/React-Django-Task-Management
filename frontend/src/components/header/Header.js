import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react'
import './Header.css'
export default function Header() {
    const {user, isAuthenticated } = useAuth0();
    return (
        <nav className="navbar navbar-light bg-light p-3">
    <div className="container-fluid d-flex align-items-center">
    <a className="navbar-brand d-flex align-items-center" href="#">
        <img
            src="https://cdn-icons-png.flaticon.com/512/5956/5956592.png"
            alt="Logo"
            height="40"
            className="me-2"
        />
        <span className="fs-4">Project Manager</span>
    </a>
    <div className="greeting-container">
        <small className="greeting-text">
            <i>Hi! {isAuthenticated ? user.name : 'please log in'}</i>
        </small>
    </div>
    </div>
</nav>

    )
}
