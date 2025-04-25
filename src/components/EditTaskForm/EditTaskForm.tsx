import React, { useState, useEffect } from 'react';
import '../AddTaskForm/style.css'; // Use AddTaskForm styles as base
import './style.css'; // Import specific styles

// Re-define Task type
type Task = {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt: Date;
};

// Define props for EditTaskForm
interface EditTaskFormProps {
  taskToEdit: Task;
  onUpdateTask: (updatedTaskData: Omit<Task, 'createdAt' | 'status'>) => void;
  onStatusChange: (id: number, newStatus: Task['status']) => void;
  onCancel: () => void;
}

// Helper function for status colors (can be moved to a utils file later)
const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'In Progress': return '#FFA500'; // Orange
    case 'Pending': return '#808080'; // Grey
    case 'Completed': return '#008000'; // Green
    default: return '#808080';
  }
};

const EditTaskForm: React.FC<EditTaskFormProps> = ({ taskToEdit, onUpdateTask, onStatusChange, onCancel }) => {
  const [title, setTitle] = useState(taskToEdit.title);
  const [description, setDescription] = useState(taskToEdit.description);
  const [currentStatus, setCurrentStatus] = useState<Task['status']>(taskToEdit.status);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Update state if the taskToEdit prop changes (e.g., user clicks edit on a different task)
  useEffect(() => {
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setCurrentStatus(taskToEdit.status);
  }, [taskToEdit]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      alert('Please enter a task title.');
      return;
    }
    // Pass back the full task data including the original ID
    onUpdateTask({ id: taskToEdit.id, title, description });
  };

  const handleStatusOptionClick = (newStatus: Task['status']) => {
    onStatusChange(taskToEdit.id, newStatus);
    setCurrentStatus(newStatus);
    setIsStatusDropdownOpen(false);
  };

  const statusOptions: Task['status'][] = ['Pending', 'In Progress', 'Completed'];

  return (
    // Use AddTaskForm container/form classes for base styling
    <div className="add-task-container"> 
      <form onSubmit={handleSubmit} className="add-task-form"> 
        <div className="form-group">
          <label htmlFor="task-title">Title</label>
          <input
            type="text"
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
          />
        </div>
        {/* Status Update Section */}
        <div className="form-group status-group">
          <label>Status</label>
          <div className="status-select-container">
            <button
              type="button"
              className="status-select-display"
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            >
               {/* Wrap dot and text in a span for left alignment */}
               <span style={{ display: 'flex', alignItems: 'center', flexGrow: 1, textAlign: 'left' }}>
                 <span className="status-dot" style={{ backgroundColor: getStatusColor(currentStatus) }}></span>
                 <span>{currentStatus}</span>
               </span>
               <span>{isStatusDropdownOpen ? '▲' : '▼'}</span>
            </button>
            {isStatusDropdownOpen && (
              <div className="status-dropdown">
                {statusOptions.map(status => {
                  const isSelected = currentStatus === status;
                  return (
                    <button
                      type="button"
                      key={status}
                      className={`status-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleStatusOptionClick(status)}
                    >
                      <span className="status-dot" style={{ backgroundColor: getStatusColor(status) }}></span>
                      <span className="status-option-text">{status}</span>
                      {isSelected && <span className="checkmark">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
          <button type="submit" className="add-button">Update</button> {/* Changed Button Text */}
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm; 