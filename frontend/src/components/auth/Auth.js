import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios
import './Auth.css'; 

export default function Auth() {  
    const { user, loginWithRedirect, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
 
    const navigate = useNavigate(); 
    const baseUrl = 'http://localhost:8080/api'
    const handleLogin = async () => {
        try {
            // Redirect user to login
            await loginWithRedirect({
                appState: {
                    returnTo: '/'  // After login, user will return here
                }
            });
        } catch (error) {
            console.error('Login error:', error.message);
        }
    }; 
    const makeBackendRequest = async () => {
        try {
            // Fetch Auth0 token
            const token = await getAccessTokenSilently();
            console.log('Token fetched:', token);

            // Send request to backend
            const response = await axios.post(`${baseUrl}/login`, {
                user: user
            }, {
                headers: {
                    Authorization: `Bearer ${token}`  
                },
                withCredentials: true
            });

            console.log('Backend login successful:', response.data);
            return response.data;  // Return the backend response data
        } catch (error) {
            console.error('Error in backend request:', error.response ? error.response.data : error.message);
            throw error;  // Throw the error so it can be handled outside
        }
    };

    const handleStartBuilding = async () => {
        try {
            const backendResponse = await makeBackendRequest(); // Wait for the backend request to complete
            console.log('Navigating to dashboard after backend response:', backendResponse);

            navigate('/dashboard'); // Navigate only after backend request completes
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
                    <button className="authButton dashboarButton" onClick={handleStartBuilding}>
                        Dashboard
                    </button>
                    <pre>
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </>
            ) : (
                <button className="authButton loginButton" onClick={handleLogin}>
                    Log In
                </button>
            )}
        </div>
    );
}
