import React from 'react';
import CurrentTicketStatusReport from './currentTicketsStatusReport/CurrentTicketStatusReport';
import TicketMigrationStatusReport from './ticketMigrationStatusReport/TicketMigrationStatusReport';

function Report() {
  return (
    <>
      <div className='flex justify-center mb-10'>
        <CurrentTicketStatusReport />
      </div>

      <div className='flex justify-center mb-10' >
        <TicketMigrationStatusReport /> 
      </div>
    </>
  );
}

export default Report;
