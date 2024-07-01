import { useState } from 'react';
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { Routes, Route } from "react-router-dom"
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './pages/Upadate';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './components/Layout';
import AuthRequired from './components/AuthRequired';
import Dashboard from './pages/Dashboard';

function App() {
  const url = "http://localhost:5000"
  const token = localStorage.getItem('token');

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedin'));

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("loggedin", true);
  };

  const logout = () => {
    localStorage.removeItem('loggedin');
    setIsLoggedIn(false);
  };
  return (
    <>
      <ToastContainer />
      <Navbar isLoggedIn={isLoggedIn} logout={logout} />
      <hr />
      <Routes>
        <Route path='/register' element={<Register url={url} />} />
        <Route path="/login" element={<Login url={url} login={login} />} />
        <Route element={<AuthRequired />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard url={url}/>} />
            <Route path="add" element={<Add url={url} token={token} />} />
            <Route path="list" element={<List url={url} token={token} />} />
            <Route path="orders" element={<Orders url={url} token={token} />} />
            <Route path="update/:id" element={<Update url={url} />} />

          </Route>
        </Route>

      </Routes>
    </>
  );
}

export default App;
