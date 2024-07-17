import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Rootpage from './components/Rootpage.jsx';
import LoginPage from './components/LoginPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import AgentDashboard from './components/AgentDashboard.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootpage/>,
    children:[
      {
        path:'/',
        element:<LoginPage/>
      },
      {
        path:'/register',
        element:<RegisterPage/>
      },
      {
        path:'/userDash',
        element:<UserDashboard/>
      },
      {
        path:'/adminDash',
        element:<AdminDashboard/>
      },
      {
        path:'/agentDash',
        element:<AgentDashboard/>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
