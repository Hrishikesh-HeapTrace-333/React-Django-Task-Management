import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Dashboard from './components/dashboard/Dashboard';
import './index.css';
import { MyProvider } from './components/context/myContext';
import CreateTicket from './components/createTicket/CreateTicket';
import Report from './components/reports/Report';
import { useEffect, useState } from 'react';
function App() {

  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])
  return (
    <Router>
      <MyProvider>
        <div className="App">
          <div className = "header absolute w-full">
            <Header/>
          </div>
          <div className='outlet'>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/createTicket" element={<CreateTicket />} />
              <Route path="/report" element={<Report />} />
            </Routes>
            {showScrollButton && (
                <button 
                  onClick={scrollToTop} 
                  className="scroll-to-top-btn"
                >
                  <img src='up.png' className='w-10'></img>
                </button>
              )}
          </div>
        </div>
      </MyProvider>
    </Router>
  );
}

export default App;
