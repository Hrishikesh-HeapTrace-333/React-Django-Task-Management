import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import './Header.css';
import MyContext from '../context/myContext';
import Sidebar from '../sidebar/Sidebar';

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth0();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { refresher, setIsSidebarOpen, isSidebarOpen} = useContext(MyContext);

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
    }, [refresher]);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    return (
        <nav className="navbar shadow-2xl">
            {isSidebarOpen && <Sidebar/>}
            
            <div className="container-fluid d-flex align-items-center">
                {isAuthenticated && (
                    <a className="sidebar-link" onClick={toggleSidebar}>
                        <img src='./sidebar.png' className='w-9' />
                    </a>
                )}
                <a className="navbar-brand d-flex align-items-center greeting-text" href="/">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/5956/5956592.png"
                        alt="Logo"
                        height="5"
                        className="me-2 w-8"
                    />
                    <span className="fs-4">Project Manager</span>
                </a>
                <div className="greeting-container" ref={dropdownRef} onClick={toggleDropDown}>
                    <small className="greeting-text">
                        <i>Hi! {isAuthenticated ? user.name.split('.')[0] > user.name.split('@')[0] ? user.name.split('@')[0] : user.name.split('.')[0] : 'please log in'}</i>
                    </small>
                    {isAuthenticated && (
                        <>
                            <img
                                src={user.picture}
                                alt="Pic"
                                height="30"
                                className="greeting-icon rounded-5"
                            />
                            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                <ul>
                                    <li onClick={() => logout()}>
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
