import React, { useContext, useEffect, useRef } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import MyContext from '../context/myContext';

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen} = useContext(MyContext);
  const sidebarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toogleSidebarOpen();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toogleSidebarOpen = () => {
    setIsSidebarOpen(prev => !prev);
  }
  
  return (
    <div ref={sidebarRef} className={`sidebar ${isSidebarOpen} ? open : ''`}>
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-items">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><Link to='/createTicket'>Create Ticket</Link></li>
        <li><Link to='/report'>Reports</Link></li>
      </ul>
    </div> 
  );
}

export default Sidebar;
