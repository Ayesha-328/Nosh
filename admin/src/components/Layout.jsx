import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {

  
  return (
    <div className="app-content">
        <Sidebar />
   
    <Outlet /> 
    
    
    </div>
    
    
  )
}

export default Layout