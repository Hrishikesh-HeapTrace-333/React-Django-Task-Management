import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Dashboard from './components/dashboard/Dashboard';
import './index.css';
function App() {
  return (
    <Router>
      <div className="App container">
        <div className = "header absolute w-full">
          <Header/>
        </div>
        <div className='outlet'>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/other" element={<OtherPage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
