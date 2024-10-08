import React, { useContext } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';
import MyContext from '../../context/myContext';

function CurrentTicketStatusReport() {
 const {NumberOfTicketsAsPerStatus } = useContext(MyContext)

 console.log("NumberOfTicketsAsPerStatus", NumberOfTicketsAsPerStatus);

  // Register only the required components for the PolarArea chart
  ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend);

  const data = {
    labels: ['Created', 'In-progress', 'Done'],
    datasets: [{
      label: 'Ticket Status Report',
      data: [...NumberOfTicketsAsPerStatus],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
      ]
    }]
  };

  return (
    <div>
      <PolarArea data={data} />
    </div>
  );
}

export default CurrentTicketStatusReport;
