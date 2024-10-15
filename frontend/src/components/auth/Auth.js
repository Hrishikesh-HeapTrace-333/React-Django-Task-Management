import React, { useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './Auth.css'; 
import MyContext from '../context/myContext';

export default function Auth({setShowOrganization}) {  
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const { setRefresher } = useContext(MyContext);
    const handleLogin = async () => {
        try {
            await loginWithRedirect({
                appState: {
                    returnTo: '/' 
                }
            });
        } catch (error) {
            console.error('Login error:', error.message);
        }
    }; 

    const handleDashboard = async () => {
        try {
            setRefresher(false);
            setShowOrganization(true)
        } catch (error) {
            console.error('Error in handling start building:', error);
        }
    };

    return (
        <div className="authButtons">
            {isAuthenticated ? (
                <>
                    <button className="authButton logoutButton" onClick={() => logout({ returnTo: window.location.origin })}>
                        Log Out
                    </button>
                    <button className="authButton dashboardButton" onClick={handleDashboard}>
                        Dashboard
                    </button>
                </>
            ) : (
                <button className="authButton loginButton" onClick={handleLogin}>
                    Log In
                </button>
            )}
        </div>
    );
}
