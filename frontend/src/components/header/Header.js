import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useRef, useState } from 'react';
import './Header.css';

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth0();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropDown = () => {
        setIsDropdownOpen(prevDropdown => !prevDropdown);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar navbar-light p-3 bg-light shadow-sm">
            <div className="container-fluid d-flex align-items-center">
                <a className="navbar-brand d-flex align-items-center greeting-text" href="/">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/5956/5956592.png"
                        alt="Logo"
                        height="40"
                        className="me-2"
                    />
                    <span className="fs-4">Project Manager</span>
                </a>
                <div className="greeting-container" ref={dropdownRef} onClick={toggleDropDown}>
                    <small className="greeting-text">
                        <i>Hi! {isAuthenticated ? user.name.split('.')[0] : 'please log in'}</i>
                    </small>
                    {isAuthenticated && (
                        <>
                            <img
                                src={user.picture}
                                alt="Pic"
                                height="30"
                                className="greeting-icon rounded-5 mx-2"
                            />
                            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                <ul>
                                    <li onClick={() => logout({ returnTo: window.location.origin })}>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
