import React, { useContext, useEffect, useState } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';
import MyContext from '../../context/myContext';
import Dashboard from '../../dashboard/Dashboard';
import './CurrentTicketStatusReport.css'; 
import '../Report.css'; 

function CurrentTicketStatusReport() {
  const { numberOfTicketsAsPerStatus } = useContext(MyContext); 
  const [loading, setLoading] = useState(true); 

  ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend);

  const data = {
    labels: ['Created', 'In-progress', 'Done'],
    datasets: [{
      label: 'Ticket Status Report',
      data: [...numberOfTicketsAsPerStatus],
      backgroundColor: [
        'rgba(34, 130, 255, 0.6)',
        'rgba(255, 238, 0, 0.6)',
        'rgba(86, 255, 86, 0.6)',
      ],
      borderColor: [
        'rgba(34, 130, 255, 1)',
        'rgba(255, 238, 0, 1)',
        'rgba(86, 255, 86, 1)',
      ],
      hoverBorderColor: [
        'rgba(34, 130, 255, 1)',
        'rgba(255, 238, 0, 1)',
        'rgba(86, 255, 86, 1)',
      ],

      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    circular : true,
    borderAlign : 'inner'
  }

  useEffect(() => {
    if (numberOfTicketsAsPerStatus.every((status) => status === 0)) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [numberOfTicketsAsPerStatus]);

  return (
    <div className="chart-wrapper">
      <div className="flex chart-container p-4 text-center">
        {loading ? (
          <>
            <div style={{ display: 'none' }}>
              <Dashboard />
            </div>
          </>
        ) : (
          <div className='flex'>
            <div className='mt-10 w-1/2 ml-4'>
                <PolarArea data={data} options={options}/>
            </div>
            <div className='text-white m-auto w-1/2 mr-8'>
            <h1 className='reportHeading'>Current Ticket Status Report</h1>
              <p className='.space-grotesk text-xl'>
                This graph give us the insights about the number of tickets remaining with respect to the status
              </p>
            </div>
          </div>
            
          
        )}
      </div>
    </div>
  );
  
}

export default CurrentTicketStatusReport;
