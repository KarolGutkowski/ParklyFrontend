import { createBrowserRouter } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Account from './Components/AccountPage/Account'
import './App.css';
import HomePage from './Components/HomePage';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <NavBar/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  },
  {
    path: "account",
    element: <Account/>
  }
]);

export default browserRouter;
