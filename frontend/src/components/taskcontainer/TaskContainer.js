import React, { useEffect, useState } from 'react';
import './TaskContainer.css'; 
import axios from 'axios';
import TaskModal from '../taskModal/TaskModal';

function TaskContainer({ ticketInfos }) {
  const [users, setUsers] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    axios.get('http://localhost:8000/api/user/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const getAssignedUser = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Anonymous'; 
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'low':
        return 'priority-low';
      case 'medium':
        return 'priority-medium';
      case 'high':
        return 'priority-high';
      default:
        return '';
    }
  };

  const handleBookClick = (ticketInfo) => {
    setSelectedTicket(ticketInfo);
    setIsModalOpen(true); 
  };

  return (
    <div className="stack-container h-[500px] w-full mx-auto rounded-lg overflow-hidden">
      {ticketInfos.map((info, index) => (
        <div
          key={index}
          className={`book p-4 h-[60px] mb-2 ${getPriorityClass(info.priority)} bg-${info.status}`}
          style={{ 
            transform: `translateY(${index * -10}px) rotateX(-30deg)`, 
            bottom: `${index * 38}px` 
          }} 
          onClick={() => handleBookClick(info)}
        >
          <div className="book-spine w-full h-full flex items-center justify-between px-4">
            <div className="flex flex-col">
              <span className="text-sm font-bold truncate">{info.ticket.ticketName || 'Untitled Ticket'}</span>
              <div className="text-xs">
                <span className="text-gray-500">By: </span>
                <span className="text-gray-800 font-semibold truncate">{getAssignedUser(info.ticket.assignee)}</span>
              </div>
              <div className="text-xs">
                <span className="text-gray-500">To: </span>
                <span className="text-gray-800 font-semibold truncate">{getAssignedUser(info.assignedTo)}</span>
              </div>
            </div>
            <span className="text-sm font-semibold">{info.priority}</span>
          </div>
        </div>
      ))}

      {isModalOpen && selectedTicket && 
      <TaskModal 
        selectedTicket={selectedTicket} 
        setIsModalOpen={setIsModalOpen}
        assignee={getAssignedUser(selectedTicket.ticket.assignee)}
        assignedTo={getAssignedUser(selectedTicket.assignedTo)}
      />}
    </div>
  );
}

export default TaskContainer;
