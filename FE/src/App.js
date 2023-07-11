import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route } from "react-router-dom";
import IndexDashBoard from './compoments/dashboard/index';

import IndexHome from './compoments/user/index';
import Login from './compoments/sign_up_in/login';
import Register from './compoments/sign_up_in/register';
function App() {
  return (
    <div>
      <Switch>
        <Route path="/home"><IndexHome /></Route>
        <Route path="/dashboard"><IndexDashBoard /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/register"><Register /></Route>
      </Switch>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;