import React, { useState } from 'react';
import './style.css'; 
import TaskItem from '../TaskItem/TaskItem';

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
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

// Type for section visibility state
type SectionVisibility = {
  InProgress: boolean;
  Pending: boolean;
  Completed: boolean;
};

// Define possible filter statuses
type FilterStatus = 'All' | Task['status'];
const filterOptions: FilterStatus[] = ['All', 'Pending', 'In Progress', 'Completed'];

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for active status filter
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('All');

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

  // Filter tasks based on selected filter AND search query
  const filteredTasks = tasks
    .filter(task => activeFilter === 'All' || task.status === activeFilter) // Filter by status first
    .filter(task => // Then filter by search query
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Group filtered tasks by status (using the already filtered list)
  const inProgressTasks = filteredTasks.filter(task => task.status === 'In Progress');
  const pendingTasks = filteredTasks.filter(task => task.status === 'Pending');
  const completedTasks = filteredTasks.filter(task => task.status === 'Completed');

  return (
    <div className="task-list-container">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search To-Do"
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Filter Controls */}
      <div className="filter-controls">
        {filterOptions.map(status => (
          <button
            key={status}
            className={`filter-button ${activeFilter === status ? 'active' : ''}`}
            onClick={() => setActiveFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* In Progress Section */}
      <div className="task-section">
        <button className="section-header" onClick={() => toggleSection('InProgress')}>
          <span>In Progress <span style={{ fontWeight: 'bold' }}>({inProgressTasks.length})</span></span>
          <span>{sectionsVisible.InProgress ? '▲' : '▼'}</span>
        </button>
        {sectionsVisible.InProgress && (
          <div className="task-items">
            {inProgressTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pending Section */}
      <div className="task-section">
        <button className="section-header" onClick={() => toggleSection('Pending')}>
          <span>Pending <span style={{ fontWeight: 'bold' }}>({pendingTasks.length})</span></span>
          <span>{sectionsVisible.Pending ? '▲' : '▼'}</span>
        </button>
        {sectionsVisible.Pending && (
          <div className="task-items">
            {pendingTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>

       {/* Completed Section */}
      <div className="task-section">
        <button className="section-header" onClick={() => toggleSection('Completed')}>
          <span>Completed <span style={{ fontWeight: 'bold' }}>({completedTasks.length})</span></span>
          <span>{sectionsVisible.Completed ? '▲' : '▼'}</span>
        </button>
        {sectionsVisible.Completed && (
          <div className="task-items">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList; 