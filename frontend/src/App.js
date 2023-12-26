import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Components/login_component';
import Signup from './Components/signup_components';
import UserDetails from './Components/UserDetails';



function App() {

  const isLoggenIn = window.localStorage.getItem("loggenIn");

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={ isLoggenIn === "true"? <UserDetails/> : <Login/>} />
              <Route path="/sign-in" element={<Login/>} />
              <Route path="/sign-up" element={<Signup/>} />
              <Route path="/userDetails" element={<UserDetails/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
