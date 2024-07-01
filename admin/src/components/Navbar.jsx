import React from 'react'
import "./navbar.css"
import {assets} from "../assets/assets"
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({isLoggedIn,logout}) => {
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    toast.success("You have been logged out.");
    logout()
};
  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="site-logo" />
      {isLoggedIn
      ?
      <div className='login-side-options'>
        <div className='login-admin'>
        <img src={assets.admin_login_icon} alt="" />
        <p>Howdy, Admin</p>
        </div>
        <button onClick={handleLogout} className="btn">Logout</button>
      </div>
      :
      <Link to="/login"><img src={assets.admin_icon} alt="" className="profile" /></Link>
      
      }
    </div>
  )
}

export default Navbar