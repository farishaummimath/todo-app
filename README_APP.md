# Todo App (React + TypeScript + Vite)

This is a simple yet functional Todo application built using React, TypeScript, and Vite.

## Features Implemented

*   **Task Listing:** Displays tasks grouped by status (Pending, In Progress, Completed). Counts in headers are bolded.
*   **Task Details:** Shows task title, description, creation date, and status indicator dot (right-aligned). Tasks are separated by divider lines.
    *   **Avatar:** Each task has a circular avatar displaying the capitalized first letter of the title (blue outline, blue text).
    *   **Hover Effect:** Task items get a light grey background (`#F7F7F7`) on hover.
*   **Add Task:** Floating action button (+) opens a form to add new tasks (default status: Pending). The button is positioned inside the main app container.
*   **Edit Task:** Edit icon on task items opens a form to modify the task title, description, and status.
    *   **Form Layout:** Labels are left-aligned. Cancel/Update buttons are positioned at the left/right ends of the form actions area.
*   **Change Status:** Task status can be changed using the status dropdown menu within the Edit Task form.
*   **Delete Task:** Delete icon on task items removes the task.
*   **Persistence:** Tasks are saved to the browser's local storage and persist across page reloads.
*   **Search:** Search input (with magnifying glass icon) filters the task list by title or description (case-insensitive).
*   **Filtering:** Buttons below search allow filtering tasks by status (All, Pending, In Progress, Completed).
*   **Expand/Collapse Sections:** Task list sections (Pending, Completed) can be expanded or collapsed. Section headers have a light blue (`#F3F6F9`) background.
*   **Custom Icons:** Uses custom icons for edit/delete actions.
*   **Custom Font:** Uses the 'Jost' font.
*   **Reusable Header:** A consistent header is used across list, add, and edit views.

## Design & Implementation Notes

*   **Framework/Tooling:** Built with React and TypeScript, using Vite for fast development and build.
*   **Component Structure:** Components are organized into feature folders within `src/components`. Each folder contains the component's `.tsx` file and its specific `style.css`.
    *   Folders: `AddTaskForm`, `EditTaskForm`, `Header`, `TaskItem`, `TaskList`.
*   **State Management:** Uses React's `useState` and `useEffect` hooks within the main `App` component to manage the task list, application view state, and persistence. `TaskList` uses `useState` for search, filtering, and section visibility.
*   **Styling:** Uses plain CSS with separate `style.css` files for each component, plus global styles in `src/App.css` and `src/index.css`.
*   **Persistence:** Leverages the browser's `localStorage` API (via `useEffect` in `App.tsx`) to save and load tasks.
*   **Shared Code:** Common types (`Task`, `TaskStatus`, `FilterStatus`) and helper functions (`getStatusColor`) should ideally be extracted into shared files (e.g., `src/types.ts`, `src/utils.ts`) - (Refactoring Opportunity).
*   **Floating Action Button (FAB):** Positioned absolutely within the main container (`.app-container`).

## Setup and Running

1.  **Prerequisites:** Make sure you have Node.js and npm (or yarn) installed.
2.  **Clone/Download:** Get the project files onto your local machine.
3.  **Navigate to Project:** Open your terminal and `cd` into the `todo-app` directory:
    ```bash
    cd path/to/todo-app
    ```
4.  **Install Dependencies:** Run the installation command:
    ```bash
    npm install
    # or if you use yarn:
    # yarn install
    ```
5.  **Run Development Server:** Start the Vite development server:
    ```bash
    npm run dev
    # or if you use yarn:
    # yarn dev
    ```
6.  **Open App:** Open your web browser and navigate to the local URL provided by Vite (usually `http://localhost:5173` or similar).

Now you can use the Todo application! 