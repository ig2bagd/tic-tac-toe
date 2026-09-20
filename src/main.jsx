import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'

// import Game from "./Game.jsx";
import { BrowserRouter } from 'react-router';

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import ProfilesPage from './pages/ProfilesPage';

import TodoList from './Todo.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/profiles',
    element: <ProfilesPage />,
    children: [
      {
        path: '/profiles/:profileId',
        element: <ProfilePage />,
      },
    ],
  },
]);


// https://react.dev/learn/tutorial-tic-tac-toe
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*     
    <BrowserRouter>
      <App />
    </BrowserRouter>
    */}

    {/* <RouterProvider router={router} /> */}
    <TodoList />
  </StrictMode>,
)
