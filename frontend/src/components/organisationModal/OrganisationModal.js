import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../context/myContext';
import { useAuth0 } from '@auth0/auth0-react';
import './OrganisationModal.css';

function OrganisationModal() {
    const navigate = useNavigate(); 
    const [ orgId,  setOrgId ] = useState(0);
    const [orgs, setOrgs] = useState([]);
    const { user, getAccessTokenSilently } = useAuth0();
    const baseUrl = 'http://localhost:8000/api';

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const makeBackendRequest = async () => {
        try {
            const token = await getAccessTokenSilently();
            await axios.post(`${baseUrl}/user/`, {
                user: {
                    name: user.name,
                    email: user.email,
                    organizations: [orgId] 
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`  
                },
                withCredentials: true
            });
        } catch (error) {
            console.error('Error in backend request:', error.response ? error.response.data : error.message);
        }
    };

    const handleNavigateToDashBoard = async (ordId) => {
        setOrgId(ordId);
        await makeBackendRequest();
        navigate('/dashboard');
    };

    const fetchOrganizations = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/org/');
            setOrgs(response.data);
        } catch (error) {
            console.error('Error fetching organizations:', error);
        }
    };

    return (
        <div className='org flex items-center justify-center w-full h-full absolute top-0 left-0'>
            <h1 className='absolute z-10 text-white top-28 font-extrabold text-4xl bg-inherit p-3 rounded-xl'>Please Select the Organization</h1>
            <div className='grid grid-cols-1 gap-6'>
                {orgs.map(org => (
                    <button 
                        key={org.id} 
                        className='text-white w-44 h-16 flex justify-center items-center bg-yellow-600 transition duration-700 hover:bg-green-700 rounded-md shadow-lg transform hover:scale-105'
                        onClick={() => handleNavigateToDashBoard(org.id)}
                    >
                        {org.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default OrganisationModal;
