import React from 'react'
import "./sidebar.css"
import {assets} from "../assets/assets"
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
   <div className="sidebar">
    <div className="sidebar-options">
      <NavLink to="/" className="sidebar-option">
      <i class="fa-solid fa-house"></i>
        <p>Dashboard</p>
      </NavLink>
      <NavLink to="/add" className="sidebar-option">
      <i class="fa-solid fa-plus"></i>
        <p>Add Menu Items</p>
      </NavLink>
      <NavLink to="/list" className="sidebar-option">
      <i class="fa-solid fa-table-list"></i>
        <p>List Menu Items</p>
      </NavLink>
      <NavLink to="/orders" className="sidebar-option">
      <i class="fa-solid fa-box"></i>
        <p>Orders</p>
      </NavLink>
    </div>
   </div>
  )
}

export default Sidebar