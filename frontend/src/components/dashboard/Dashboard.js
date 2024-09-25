import React from 'react';
import TaskContainer from '../taskcontainer/TaskContainer';
import './Dashboard.css'; // Importing the CSS file

export default function Dashboard() {
  return (
    <>
      <div className='dashboard-container'>
        <div className='column backlog'>
          <h1>Backlog</h1>
          <TaskContainer />
        </div>
        <div className='column inprogress'>
          <h1>In Progress</h1>
          <TaskContainer />
        </div>
        <div className='column completed'>
          <h1>Completed</h1>
          <TaskContainer />
        </div>
      </div>
    </>
  );
}
