import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import Flows from "./views/Flows";
import UserForm from "./views/UserForm";
import WaForm from "./views/WaForm";
import Flow from "./components/flowwidgets/Flow.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/flows"/>
      },
      // {
      //   path: '/dashboard',
      //   element: <Dashboard/>
      // },
      // {
      //   path: '/users',
      //   element: <Users/>
      // },
      // {
      //   path: '/users/new',
      //   element: <UserForm key="userCreate" />
      // },
      // {
      //   path: '/users/:id',
      //   element: <UserForm key="userUpdate" id="userUpdate"/>
      // },
      {
        path: '/flows',
        element: <Flows/>
      },
      {
        path: '/flows/new',
        element: <Flow key="flowCreate" />
      },
      {
        path: '/flows/:id',
        element: <Flow key="flowUpdate" />
      },
      {
        path: '/flows/view/:id',
        element: <Flow key="flowView" />
      },
      {
        path: '/flows/wa/:id/config',
        element: <WaForm key="config" />
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
