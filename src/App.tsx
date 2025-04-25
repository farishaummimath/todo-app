import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './components/TaskList/TaskList'
import AddTaskForm from './components/AddTaskForm/AddTaskForm'
import EditTaskForm from './components/EditTaskForm/EditTaskForm'
import Header from './components/Header/Header'

type Task = {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt: Date;
};

// Key for local storage
const LOCAL_STORAGE_KEY = 'react-todo-app-tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      // Parse stored tasks and convert date strings back to Date objects
      try {
        const parsedTasks = JSON.parse(storedTasks) as Omit<Task, 'createdAt'> & { createdAt: string }[];
        return parsedTasks.map(task => ({
          ...task,
          createdAt: new Date(task.createdAt) // Convert string back to Date
        })) as Task[]; // Explicitly cast the result of map
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        // Fallback handled by returning default tasks below
      }
    }
    // Default tasks if nothing in localStorage or if parsing failed
    return [
      { id: 1, title: 'Lorem Ipsum Task 1', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', status: 'In Progress', createdAt: new Date() },
      { id: 2, title: 'Lorem Ipsum Task 2', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', status: 'In Progress', createdAt: new Date() },
      { id: 3, title: 'Pending Task 1', description: 'Another task description', status: 'Pending', createdAt: new Date() },
      { id: 4, title: 'Completed Task 1', description: 'Finished this one', status: 'Completed', createdAt: new Date() },
    ] as Task[]; // Cast needed here as initial value shape might differ slightly
  });

  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  // Effect to save tasks to localStorage whenever they change
  useEffect(() => {
    // JSON.stringify automatically converts Date objects to ISO strings
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    console.log('Tasks saved to localStorage');
  }, [tasks]);

  // --- Handler Functions ---
  const handleEdit = (id: number) => {
    console.log('Attempting to edit task:', id);
    setEditingTaskId(id);
    setCurrentView('edit');
  };

  const handleDelete = (id: number) => {
    console.log('Deleting task:', id);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: Task['status']) => {
    console.log('Changing status for task:', id, 'to', newStatus);
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now(),
      status: 'Pending',
      createdAt: new Date(),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setCurrentView('list');
    console.log('Added new task:', newTask);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingTaskId(null);
  };

  const handleUpdateTask = (updatedTaskData: Omit<Task, 'createdAt' | 'status'>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTaskData.id
          ? { ...task, title: updatedTaskData.title, description: updatedTaskData.description }
          : task
      )
    );
    setCurrentView('list');
    setEditingTaskId(null);
    console.log('Updated task:', updatedTaskData.id);
  };

  const taskToEdit = tasks.find(task => task.id === editingTaskId);

  let headerTitle = 'TO-DO APP';
  let showBackButton = false;

  if (currentView === 'add') {
    headerTitle = 'Add New Task';
    showBackButton = true;
  } else if (currentView === 'edit') {
    headerTitle = 'Edit Task';
    showBackButton = true;
  }

  return (
    <div className="app-container">
      <Header
        title={headerTitle}
        showBackButton={showBackButton}
        onBack={handleCancel}
      />

      {/* Conditional Rendering based on currentView */}
      {currentView === 'list' && (
        <>
          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {/* Floating Action Button to Add Task */}
          <button onClick={() => setCurrentView('add')} className="fab">+</button>
        </>
      )}

      {currentView === 'add' && (
        <AddTaskForm onAddTask={handleAddTask} onCancel={handleCancel} />
      )}

      {currentView === 'edit' && taskToEdit && (
         <EditTaskForm
           taskToEdit={taskToEdit}
           onUpdateTask={handleUpdateTask}
           onStatusChange={handleStatusChange}
           onCancel={handleCancel}
         />
      )}
       {currentView === 'edit' && !taskToEdit && (
         // Handle case where task to edit wasn't found
         <div>
           <p>Error: Task not found.</p>
           <button onClick={handleCancel}>Back to List</button>
         </div>
        )}
    </div>
  )
}

export default App
