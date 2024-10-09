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
  const { setNumberOfTicketsAsPerStatus} = useContext(MyContext)
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

  useEffect(() => {
    const counts = [0, 0, 0]; 
    ticketInfo.forEach(info => {
      if (info.status === 'created') counts[0]++;
      else if (info.status === 'in-progress') counts[1]++;
      else if (info.status === 'done') counts[2]++;
    });
    setNumberOfTicketsAsPerStatus(counts);
  }, [ticketInfo]);

  const getTicketInfos = (status) => {
    const newTicketCounts = [0, 0, 0];
    const filteredInfos = ticketInfo.filter(info => info.status === status).map(info => {
      if (info.status === 'created') {
        newTicketCounts[0]++;
      } else if (info.status === 'in-progress') {
        newTicketCounts[1]++;
      } else if (info.status === 'done') {
        newTicketCounts[2]++;
      }
  
      const ticket = tickets.find(ticket => ticket.id === info.ticket);
      return { ...info, ticket };
    });
  
    return filteredInfos;
  };
  
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
        <div className='column backlog border border-white'>
          <h1>Backlog</h1>
          <TaskContainer users={users} ticketInfos={getTicketInfos("created")} updateTicketStatus={updateTicketStatus} setTicket_TicketInfo_Id={setTicket_TicketInfo_Id} state='created'/>
        </div>
        <div className='column inprogress border border-white'>
          <h1>In Progress</h1>
          <TaskContainer users={users} ticketInfos={getTicketInfos("in-progress")} updateTicketStatus={updateTicketStatus} setTicket_TicketInfo_Id={setTicket_TicketInfo_Id} state='in-progress'/>
        </div>
        <div className='column completed border border-white'>
          <h1>Completed</h1>
          <TaskContainer users={users} ticketInfos={getTicketInfos("done")} updateTicketStatus={updateTicketStatus} setTicket_TicketInfo_Id={setTicket_TicketInfo_Id} state='done'/>
        </div>
      </div>
    </>
  
  );
}
