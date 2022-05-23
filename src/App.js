import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Feed from './Components/Feed';
import Forgot from './Components/Forgot';
import Login from './Components/login';
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './privateroute';
function App() {
  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<Signup />} />
          <Route path='/forgot' exact element={<Forgot/>}/>
          <Route path='/profile/:id' exact element={<PrivateRoute> {<Profile/>} </PrivateRoute>} />
          <Route path='/' exact element={<PrivateRoute> {<Feed />} </PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>

  );
}

export default App;
