import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 

export default function Auth() {
    const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const navigate = useNavigate(); 

    const handleLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: '/dashboard' 
            }
        });
    };

    const handleStartBuilding = () => {
        navigate('/dashboard'); 
    };

    return (
        <div className="authButtons">
            {isAuthenticated ?
                <>
                    <button className="authButton logoutButton" onClick={() => logout({ returnTo: window.location.origin })}>
                        Log Out
                    </button>
                    <button className="authButton dashboarButton" onClick={handleStartBuilding}>
                        Dashboard
                    </button>
                </> :
                <button className="authButton loginButton" onClick={handleLogin}>
                    Log In
                </button>}
        </div>
    );
}
