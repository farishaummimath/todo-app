import React, { useState } from 'react';
import './TaskList.css'; // We'll create this CSS file next
import TaskItem from './TaskItem'; // Import TaskItem

// Define the Task type again (or import from App.tsx if refactored later)
type Task = {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt: Date;
};

// Define the props for TaskList
interface TaskListProps {
  tasks: Task[];
  // TODO: Define actual functions later
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, newStatus: Task['status']) => void;
}

// Type for section visibility state
type SectionVisibility = {
  InProgress: boolean;
  Pending: boolean;
  Completed: boolean;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onStatusChange }) => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // State to manage section visibility
  const [sectionsVisible, setSectionsVisible] = useState<SectionVisibility>({
    InProgress: true, // Start with In Progress open
    Pending: false,
    Completed: false,
  });

  // Function to toggle section visibility
  const toggleSection = (sectionName: keyof SectionVisibility) => {
    setSectionsVisible(prevState => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

  // Filter tasks based on search query (case-insensitive)
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group filtered tasks by status
  const inProgressTasks = filteredTasks.filter(task => task.status === 'In Progress');
  const pendingTasks = filteredTasks.filter(task => task.status === 'Pending');
  const completedTasks = filteredTasks.filter(task => task.status === 'Completed');

  return (
    <div className="task-list-container">
      {/* Search Bar - Controlled Input */}
      <input
        type="text"
        placeholder="Search To-Do"
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* In Progress Section */}
      <div className="task-section">
        <button className="section-header" onClick={() => toggleSection('InProgress')}>
          <span>In Progress ({inProgressTasks.length})</span>
          <span>{sectionsVisible.InProgress ? '▲' : '▼'}</span> {/* Dynamic Icon */}
        </button>
        {sectionsVisible.InProgress && ( /* Conditional Rendering */
          <div className="task-items">
            {inProgressTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pending Section */}
      <div className="task-section">
        <button className="section-header" onClick={() => toggleSection('Pending')}>
          <span>Pending ({pendingTasks.length})</span>
          <span>{sectionsVisible.Pending ? '▲' : '▼'}</span> {/* Dynamic Icon */}
        </button>
        {sectionsVisible.Pending && ( /* Conditional Rendering */
          <div className="task-items">
            {pendingTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        )}
      </div>

       {/* Completed Section */}
      <div className="task-section">
        <button className="section-header" onClick={() => toggleSection('Completed')}>
          <span>Completed ({completedTasks.length})</span>
          <span>{sectionsVisible.Completed ? '▲' : '▼'}</span> {/* Dynamic Icon */}
        </button>
        {sectionsVisible.Completed && ( /* Conditional Rendering */
          <div className="task-items">
            {completedTasks.map(task => (
               <TaskItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
               />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList; 