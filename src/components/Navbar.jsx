import React from 'react'
import mainLogo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
      <Link className="navbar-brand" to="/dashboard">
        <img src={mainLogo} width="100" alt="main-logo" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link btn btn-danger"
              to="/"
              style={{ color: '#fff' }}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
