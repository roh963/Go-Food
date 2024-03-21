import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbars() {
  return (
    <>
     <nav className="navbar navbar-expand-lg navbar-light  bg-dark">
      <Link className="navbar-brand m-2 p-2"  style={{ fontWeight: 'bold', color:'#d6d3c9',fontStyle: 'italic' }}> GO Food </Link>
    
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link semibold-text" style={{ fontWeight: '600', color: '#e1faf9' }} to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link semibold-text" style={{ fontWeight: '600', color: '#e1faf9' }} to="/">Features</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link semibold-text" style={{ fontWeight: '600', color: '#e1faf9' }} to="/login">Login</Link>
          </li>
         
          <li className="nav-item">
            <Link className="nav-link semibold-text" style={{ fontWeight: '600', color: '#e1faf9' }} to="/createuser">SignUp</Link>
          </li>
         
        </ul>
      </div>
    </nav>
  
    </>
  )
}
