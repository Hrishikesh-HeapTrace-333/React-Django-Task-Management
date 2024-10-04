import React, { useContext, useEffect, useState } from 'react';
import TaskContainer from '../taskcontainer/TaskContainer';
import './Dashboard.css'; 
import axios from 'axios';
import MyContext from '../context/myContext';
import { useAuth0 } from "@auth0/auth0-react";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [ticketInfo, setTicketInfo] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [users, setUsers] = useState([]);
  const [ticket_TicketInfo_Id, setTicket_TicketInfo_Id] = useState([]);

  useEffect(() => {
    // Run both fetch functions and set loading to false when done
    Promise.all([fetchUsers(), fetchTickets(), fetchTicketInfo()]).then(() => {
      setLoading(false);
    });
  }, []);

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/ticket/');
      setTickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch ticket info
  const fetchTicketInfo = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/ticket_info/');
      setTicketInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user/');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
}

  const getTicketInfos = (status) => {
    return ticketInfo
      .filter(info => info.status === status)  
      .map(info => {
        const ticket = tickets.find(ticket => ticket.id === info.ticket);
        return { ...info, ticket };  
      });
  }

  if (loading) {
    return (
      <div className="loader">Loading...</div>
    );
  }

  const updateTicketStatus = async(status) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/ticket_info/${ticket_TicketInfo_Id[0]}/`,
        {
          ticketInfo: {
            ticket: ticket_TicketInfo_Id[1],
            status
          }
      })

      console.log('updateTicketStatus', response);
      await fetchTicketInfo();
    } catch (error) {
      console.log('failed to update the ticket status', error)
    }
  }
  
  return (
    <>
    <div className='dashboard-container lg:flex-row gap-5'>
        <div className='column backlog'>
          <h1>Backlog</h1>
          <TaskContainer users={users} ticketInfos={getTicketInfos("created")} updateTicketStatus={updateTicketStatus} setTicket_TicketInfo_Id={setTicket_TicketInfo_Id}/>
        </div>
        <div className='column inprogress'>
          <h1>In Progress</h1>
          <TaskContainer users={users} ticketInfos={getTicketInfos("in-progress")} updateTicketStatus={updateTicketStatus} setTicket_TicketInfo_Id={setTicket_TicketInfo_Id}/>
        </div>
        <div className='column completed'>
          <h1>Completed</h1>
          <TaskContainer users={users} ticketInfos={getTicketInfos("done")} updateTicketStatus={updateTicketStatus} setTicket_TicketInfo_Id={setTicket_TicketInfo_Id}/>
        </div>
      </div>
    </>
  
  );
}
