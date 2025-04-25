# Todo App (React + TypeScript + Vite)

This is a simple yet functional Todo application built using React, TypeScript, and Vite.

## Features Implemented

*   **Task Listing:** Displays tasks grouped by status (Pending, In Progress, Completed).
*   **Task Details:** Shows task title, description, creation date, and status indicator (left-aligned).
*   **Add Task:** Floating action button (+) opens a form to add new tasks (default status: Pending). The button is positioned within the main app container.
*   **Edit Task:** Edit icon on task items opens a form to modify the task title and description (labels are left-aligned). Status display is also left-aligned.
*   **Change Status:** Task status can be changed using the status dropdown menu within the Edit Task form.
*   **Delete Task:** Delete icon on task items removes the task.
*   **Persistence:** Tasks are saved to the browser's local storage and persist across page reloads.
*   **Search:** Search input filters the task list by title or description (case-insensitive).
*   **Expand/Collapse Sections:** Task list sections (Pending, Completed) can be expanded or collapsed.
*   **Custom Icons:** Uses custom icons for edit/delete actions.
*   **Custom Font:** Uses the 'Jost' font.
*   **Reusable Header:** A consistent header is used across list, add, and edit views.

## Design & Implementation Notes

*   **Framework/Tooling:** Built with React and TypeScript, using Vite for fast development and build.
*   **Component Structure:** The application is broken down into reusable components (`App`, `TaskList`, `TaskItem`, `AddTaskForm`, `EditTaskForm`, `Header`) located in `src/components`.
*   **State Management:** Uses React's `useState` and `useEffect` hooks within the main `App` component to manage the task list, application view state, and persistence.
*   **Styling:** Uses plain CSS with separate files for each component (`src/components/*.css`), plus global styles in `src/App.css` and `src/index.css`.
*   **Persistence:** Leverages the browser's `localStorage` API (via `useEffect` in `App.tsx`) to save and load tasks.
*   **Shared Code:** Common types (`Task`, `TaskStatus`) should ideally be in `src/types.ts` (Refactoring Opportunity), and helper functions (`getStatusColor`) in `src/utils.ts` (Refactoring Opportunity).
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