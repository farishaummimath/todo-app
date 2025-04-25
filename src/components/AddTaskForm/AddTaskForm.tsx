import React, { useState } from 'react';
import './style.css';
type Task = {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt: Date;
};

// Define props for AddTaskForm
interface AddTaskFormProps {
  onAddTask: (newTaskData: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      alert('Please enter a task title.');
      return;
    }
    onAddTask({ title, description });
  };

  return (
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
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
          <button type="submit" className="add-button">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm; 