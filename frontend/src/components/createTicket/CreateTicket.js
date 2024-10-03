import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function CreateTicket() {
    const { user } = useAuth0();
    const{ userId, setUserId } = useContext(MyContext);
    let values = {};

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
        const users = await fetchUsers();
        setUserId(users.find(u => u.email === user.name)?.id);
        const ticket = await addTicket();
        const ticketInfo = await addTicketInfo(ticket.id);
        console.log(ticketInfo);
    };

    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/user/');
          return response.data;
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <div className="flex justify-center bg-transparent">
            <div className="bg-transparent bg-opacity-20 backdrop-blur-md border border-opacity-60 rounded-lg shadow-lg p-6 w-full max-w-3xl">
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
                            <option value="" disabled selected>Select Organization</option>
                            <option value="1">Organization 1</option>
                            <option value="2">Organization 2</option>
                        </select>
                    </div>
                    <div className="col-span-1">
                        <select 
                            name="priority" 
                            className="w-full p-2 border border-white border-opacity-30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <option value="" disabled selected>Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="col-span-1">
                        <select 
                            name="assignedTo" 
                            className="w-full p-2 border border-white border-opacity-30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <option value="" disabled selected>Assign To</option>
                            <option value="1">User 1</option>
                            <option value="2">User 2</option>
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
                            <option value="" disabled selected>Select Sprint</option>
                            <option value="1">Sprint 1</option>
                            <option value="2">Sprint 2</option>
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
                            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
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
