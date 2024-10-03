import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Dashboard from './components/dashboard/Dashboard';
import './index.css';
import { MyProvider } from './components/context/myContext';
import CreateTicket from './components/createTicket/CreateTicket';
import Report from './components/reports/Report';
function App() {
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
          </div>
        </div>
      </MyProvider>
    </Router>
  );
}

export default App;
