import React from 'react';
import './TaskModal.css';

function TaskModal({ selectedTicket, setIsModalOpen, assignee, assignedTo }) {
  return (
    <div className={`modal-overlay`} onClick={() => setIsModalOpen(false)}>
      <div className="modal-content animated fadeIn" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="text-2xl font-bold">{selectedTicket.ticket.ticketName}</h2>
          <button className={`close-modal-btn ${selectedTicket.status}s`} onClick={() => setIsModalOpen(false)}>
            &times;
          </button>
        </div>
        <div className={`modal-body ${selectedTicket.status}s`}>
          <div className="ticket-info">
            <div className="info-row">
              <span className="info-label">Assignee:</span>
              <span className="info-value">{assignee}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Assigned To:</span>
              <span className="info-value">{assignedTo}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status:</span>
              <span className={`status-indicator ${selectedTicket.status}`}>{selectedTicket.status}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Priority:</span>
              <span className={`priority-indicator ${selectedTicket.priority}`}>{selectedTicket.priority}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Due Date:</span>
              <span className="info-value">{selectedTicket.dueDate || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Description:</span>
              <span className="info-value">{selectedTicket.ticket.description || 'No description available'}</span>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={() => setIsModalOpen(false)} className={`close-modal-btn ${selectedTicket.status}s`}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
