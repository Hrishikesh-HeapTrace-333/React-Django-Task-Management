import React, { useContext, useEffect, useState } from 'react';
import TaskContainer from '../taskcontainer/TaskContainer';
import './Dashboard.css'; 
import axios from 'axios';
import MyContext from '../context/myContext';
import Sidebar from '../sidebar/Sidebar';

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [ticketInfo, setTicketInfo] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const {isSidebarOpen, setIsSidebarOpen} = useContext(MyContext);

  useEffect(() => {
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

    // Run both fetch functions and set loading to false when done
    Promise.all([fetchTickets(), fetchTicketInfo()]).then(() => {
      setLoading(false);
    });
  }, []);

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
  
  return (

    <>
      {isSidebarOpen && <Sidebar/>}
      <div className='dashboard-container '>
        <div className='column backlog'>
          <h1>Backlog</h1>
          <TaskContainer ticketInfos={getTicketInfos("created")} />
        </div>
        <div className='column inprogress'>
          <h1>In Progress</h1>
          <TaskContainer ticketInfos={getTicketInfos("in-progress")} />
        </div>
        <div className='column completed'>
          <h1>Completed</h1>
          <TaskContainer ticketInfos={getTicketInfos("done")} />
        </div>
      </div>
    </>
  
  );
}
