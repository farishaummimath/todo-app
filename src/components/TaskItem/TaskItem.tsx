import React from 'react';
import './style.css'; 

type Task = {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt: Date;
};

// Define props for TaskItem
interface TaskItemProps {
  task: Task;
  onEdit: (id: number) => void; // Function to handle editing
  onDelete: (id: number) => void; // Function to handle deletion
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onEdit, 
  onDelete,
 }) => {
  // Function to format the date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short', // e.g., Wed
      day: 'numeric',   // e.g., 31
      month: 'short',  // e.g., Jul
      year: 'numeric', // e.g., 2024
    });
  };

  // Determine the status indicator color
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'In Progress': return '#FFA500'; // Orange
      case 'Pending': return '#808080'; // Grey
      case 'Completed': return '#008000'; // Green
      default: return '#808080'; // Default Grey
    }
  };

  // Get the first letter of the title for the avatar
  const firstLetter = task.title ? task.title.charAt(0).toUpperCase() : '?';

  return (
    <div className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`}>
      <div className="task-item-main">
         <span className="task-avatar">{firstLetter}</span>

         {/* Task Details */}
         <div className="task-details">
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.description}</p>
          <p className="task-date">{formatDate(task.createdAt)}</p>
        </div>

         {/* Status Label with Dot */}
         <div className="task-status-label">
           <span className="status-dot" style={{ backgroundColor: getStatusColor(task.status) }}></span>
           {task.status}
         </div>
      </div>

      {/* Action buttons */}
      <div className="task-actions">
        <button onClick={() => onEdit(task.id)} className="action-button edit-button" title="Edit Task">
          <img src="/icons/Pencil.png" alt="Edit" />
        </button>
        <button onClick={() => onDelete(task.id)} className="action-button delete-button" title="Delete Task">
          <img src="/icons/Trash.png" alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem; 