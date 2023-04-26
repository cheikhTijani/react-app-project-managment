import React from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import './App.css';

import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import ProjectDetail from './pages/project/ProjectDetail';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./hooks/useAuthContext";
import OnlineUsers from "./components/OnlineUsers";


function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Sidebar />}
        <div className="container">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path="/projects/:id"
              element={user ? <ProjectDetail /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        {user && <OnlineUsers />}
      </BrowserRouter>
    </div>
  );
}

export default App;
