import React, { useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './Auth.css'; 
import MyContext from '../context/myContext';

export default function Auth() {  
    const { user, loginWithRedirect, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
    const { setRefresher, setUserId} = useContext(MyContext);
    const navigate = useNavigate(); 
    const baseUrl = 'http://localhost:8000/api'
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

    const makeBackendRequest = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.post(`${baseUrl}/user/`, {
               user : {
                    name : user.name,
                    email : user.email,
                    organizations : [2] //temperary until organization flow is implemented
                  }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`  
                },
                withCredentials: true
            });
            return response.data;  
        } catch (error) {
            console.error('Error in backend request:', error.response ? error.response.data : error.message);
            throw error;  
        }
    };

    const handleDashboard = async () => {
        try {
            const backendResponse = await makeBackendRequest(); 
            setRefresher(false);
            navigate('/dashboard'); 
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
