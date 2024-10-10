import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function TicketMigrationStatusReport() {
    const [tickets, setTickets] = useState([]);
    const [ticketInfo, setTicketInfo] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        Promise.all([fetchTickets(), fetchTicketInfo()]).then(() => {
            mergeTicketAndTicketInfos();
        });
    }, []);

    const mergeTicketAndTicketInfos = () => {
        const newTicketNames = [];
        const newCreatedToProgress = [];
        const newProgressToDone = [];
        
        ticketInfo.forEach(info => {
            const ticket = tickets.find(t => t.id === info.ticket);
            if (ticket) {          
                newTicketNames.push(ticket.ticketName);
                let days = getTimeDifference(ticket.createdAt, info.created_to_in_progress_at);
                newCreatedToProgress.push(days);
                newProgressToDone.push(getTimeDifference(info.created_to_in_progress_at, info.in_progress_to_done_at) + days);
            }
        });
        
        const tempChartData = {
            labels: newTicketNames,
            datasets: [
                {
                    label: 'Created to In Progress (Days)',
                    data: newCreatedToProgress,
                    backgroundColor: 'rgba(255, 238, 0, 0.6)',
                },
                {
                    label: 'In Progress to Done (Days)',
                    data: newProgressToDone,
                    backgroundColor: 'rgba(86, 255, 86, 0.6)',
                }
            ]
        };
        
        setChartData(tempChartData)
        
        setLoading(false);            
    };


    const getTimeDifference = (date1, date2) => {
        const diffInMilliseconds = Math.abs(new Date(date2) - new Date(date1));
        return Math.max(1, Math.min(Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)), 15)); 
    };

    // Fetch tickets
    const fetchTickets = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/ticket/');
            setTickets(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch ticket info
    const fetchTicketInfo = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/ticket_info/');
            setTicketInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    

    const options = {
        responsive: true,
        scales: {
            x: { stacked: true },
            y: { beginAtZero: true }
        }
    };

    return (
        <div className="chart-wrapper">
        {
        loading ? <p className='border h-6 '>Loading...</p> : 
            <div className="flex chart-container p-4 text-center">
                <div className="mt-10 w-2/3 m-auto ">
                    <Bar  data={chartData} options={options} />
                </div>
                <div className="text-white m-auto w-1/2 mr-8">
                    <h1 className="reportHeading">Ticket Migration Status Report</h1>
                    <p className="space-grotesk text-xl">
                        This report provides insights on how much time tickets took to move from "Created" to "In Progress" and "In Progress" to "Done."
                    </p>
                </div>
            </div>
        }
        </div>
    );
}

export default TicketMigrationStatusReport;
