import React from 'react';
import CurrentTicketStatusReport from './currentTicketsStatusReport/CurrentTicketStatusReport';
import './Report.css';
import TicketMigrationStatusReport from './ticketMigrationStatusReport/TicketMigrationStatusReport';

function Report() {
  return (
    <>
      <div className='flex justify-center mb-10'>
        <CurrentTicketStatusReport />
      </div>
    </>
  );
}

export default Report;
