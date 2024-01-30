import { createBrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import Account from './Components/AccountPage/Account'
import './App.css';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: "account",
    element: <Account/>,
  }
]);

export default browserRouter;
