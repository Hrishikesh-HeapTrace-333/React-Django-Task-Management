import React, { useEffect, useState } from 'react';
import TaskContainer from '../taskcontainer/TaskContainer';
import './Dashboard.css'; 
import axios from 'axios';

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [ticketInfo, setTicketInfo] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/ticket/')
      .then(response => {
        setTickets(response.data);
      })
      .catch(error => console.log(error));

    axios.get('http://127.0.0.1:8000/api/ticket_info/')
      .then(response => {
        setTicketInfo(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const getTicketInfos = (status) => {
    return ticketInfo
      .filter(info => info.status === status)  
      .map(info => {
        const ticket = tickets.find(ticket => ticket.id === info.ticket);
        return { ...info, ticket };  
      });
  }

  return (
    <div className='dashboard-container'>
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
  );
}
