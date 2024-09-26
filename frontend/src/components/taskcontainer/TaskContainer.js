import React from 'react';
import './TaskContainer.css'; 

function TaskContainer({ ticketInfos }) {
  return (
    <div className="container mx-auto p-6 bg-gray-200 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-700 text-center">Task Stack</h1>
      <div className="stack-container h-[500px] w-full mx-auto bg-gray-300 rounded-lg overflow-hidden">
        {ticketInfos.map((info, index) => (
          <div
            key={index}
            className={`book p-2 h-[50px] bg-white shadow-lg mb-2 
              ${info.status === 'created' ? 'bg-created' : info.status === 'in-progress' ? 'bg-in-progress' : 'bg-done'}`}
            style={{ 
              transform: `translateY(${index * -10}px) rotateX(-30deg)`, 
              bottom: `${index * 25}px` 
            }} 
          >
            <div 
              className={`book-spine w-full h-full flex items-center justify-between px-3 ${info.status === 'created' ? 'bg-created' : info.status === 'in-progress' ? 'bg-in-progress' : 'bg-done'}`}
              style={{
                borderLeft: `4px solid ${info.status === 'created' ? '#31e7ff' : info.status === 'in-progress' ? '#eeff00' : '#4aff7e'}`
              }}
            >
              <span className="text-sm font-semibold">{info.ticket.ticketName}</span>
              <span className="text-sm">{info.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskContainer;
