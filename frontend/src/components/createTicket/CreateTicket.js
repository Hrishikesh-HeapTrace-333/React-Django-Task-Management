import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/myContext';
import './CreateTicket.css';
function CreateTicket() {
    const { user } = useAuth0();
    const{ userId, setUserId } = useContext(MyContext);
    const [users, setUsers] = useState([]);
    const [orgs, setOrgs] = useState([]);
    let values = {};

    useEffect(()=>{
        fetchOrgs();
        fetchUsers();
    }, [])

    const addTicket = async () => {
        try {
          const ticketResponse = await axios.post('http://127.0.0.1:8000/api/ticket/', 
            {
                ticket: {
                    ticketName: values.ticketName,
                    assignee: userId,
                    organization: values.organization, 
                    description : values.description,
                    sprint : values.sprint,
                    points : values.points
                },
            }
          );
          return ticketResponse.data;
        } catch (error) {
          console.log(error);
        }
    };

    const addTicketInfo = async (ticket) =>{
        const response = await axios.post('http://127.0.0.1:8000/api/ticket_info/', 
            {
                ticketInfo: {
                    ticket: ticket,
                    assignedTo: values.assignedTo,
                    priority: values.priority, 
                    status : values.status,
                    dueDate : values.dueDate
                },
            }
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        values = Object.fromEntries(new FormData(e.target));
        setUserId(users.find(u => u.email === user.name)?.id);
        const ticket = await addTicket();
        const ticketInfo = await addTicketInfo(ticket.id);
        console.log(ticketInfo);
    };

    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/user/');
          console.log(response.data);
          setUsers(response.data);
          return response.data;
        } catch (error) {
          console.log(error);
        }
    }

    const fetchOrgs = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/org/');
          console.log(response.data);
          setOrgs(response.data);
          return response.data;
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <div className="flex justify-center bg-transparent">
            <div className="form rounded-lg shadow-lg p-6 w-full max-w-3xl">
                <h1 className="text-2xl font-semibold text-center text-white mb-6">Create Ticket</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <input 
                            type="text" 
                            name="ticketName" 
                            placeholder="Ticket Title" 
                            required 
                            className="w-full p-2 border border-white border-opacity-30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white" 
                        />
                    </div>
                    <div className="col-span-1">
                        <input 
                            type="text" 
                            name="assignee" 
                            defaultValue={user.name} 
                            readOnly 
                            required 
                            className="w-full p-2 border border-white border-opacity-30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    <div className="col-span-1">
                        <select 
                            name="organization" 
                            required 
                            className="w-full p-2 border border-white border-opacity-30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <option className="text-black bg-transparent" value="" disabled selected>Select Organization</option>
                            {orgs.length > 0 && orgs.map(u => (
                                <option className="text-black" key={u.id} value={u.id}>{u.name}</option>
                            ))}
                            
                        </select>
                    </div>
                    <div className="col-span-1">
                        <select 
                            name="priority" 
                            className="w-full p-2 border border-white border-opacity-30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <option className="text-black bg-transparent" value="" disabled selected>Select Priority</option>
                            <option className="text-black bg-transparent" value="low">Low</option>
                            <option className="text-black bg-transparent" value="medium">Medium</option>
                            <option className="text-black bg-transparent" value="high">High</option>
                        </select>
                    </div>
                    <div className="col-span-1">
                        <select 
                            name="assignedTo" 
                            className="w-full p-2 border border-white border-opacity-30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <option className="text-black" value="" disabled selected>Assign To</option>
                            {users.length > 0 && users.map(u => (
                                <option className="text-black" key={u.id} value={u.id}>{u.name}</option>
                            ))}

                        </select>
                    </div>
                    <div className="col-span-1">
                        <input 
                            type="date" 
                            name="dueDate" 
                            className="w-full p-2 border border-white border-opacity-30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    <div className="col-span-1">
                        <input 
                            type="number" 
                            name="points" 
                            placeholder="Points" 
                            className="w-full p-2 border border-white border-opacity-30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <select 
                            name="sprint" 
                            className="w-full p-2 border border-white border-opacity-30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <option className="text-black bg-transparent" value="" disabled selected>Select Sprint</option>
                            <option className="text-black bg-transparent" value="1">Sprint 1</option>
                            <option className="text-black bg-transparent" value="2">Sprint 2</option>
                        </select>
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <textarea 
                            name="description" 
                            placeholder="Ticket Description"  
                            className="w-full p-2 border border-white border-opacity-30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <button 
                            type="submit" 
                            // style={{
                            //     fontWeight: 'bold',
                            //     backgroundColor: 'rgba(0, 255, 0, 0.15)',
                            //     color: '#00FF00',
                            //     border: 'none',
                            //     cursor: 'pointer',
                            //     fontSize: '16px',
                            // }}
                            className="submitButton w-full py-2 px-4  bg-opacity-20 border border-green-500 text-white rounded-md transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTicket;
