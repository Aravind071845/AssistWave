import LandingPage from './Pages/Landingpage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './Pages/Dashboard';

import './App.css';
import { Routes,Route, BrowserRouter } from 'react-router-dom';


function App() {

  return (
    <div>
       <BrowserRouter>
           <Routes>
              <Route path='/' element={<LandingPage/>}></Route>
              <Route path='/register' element={<SignUp/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/dashboard' element={<Dashboard/>}></Route>
           </Routes>
       </BrowserRouter>
    </div>
  );

}

export default App;
