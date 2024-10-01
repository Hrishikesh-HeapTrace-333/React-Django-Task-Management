import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className={`sidebar open`}>
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-items">
        <li>Home</li>
        <li>Create Ticket</li>
        <li>Reports</li>
        <li>Settings</li>
      </ul>
    </div> 
  );
}

export default Sidebar;
