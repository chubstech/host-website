import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="sidebar no-print">
      <h2>Innovation Lab</h2>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/report">Report</NavLink></li>
        <li><NavLink to="/help">Help</NavLink></li>
        </ul>
    </div>
  )
}

export default Sidebar
