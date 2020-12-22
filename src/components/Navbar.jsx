import React from 'react'
import mainLogo from '../assets/logo.png'
import { Link, useHistory } from 'react-router-dom'
import { logOut } from '../store/index'
import { useDispatch } from 'react-redux'
import swal from 'sweetalert'

function Navbar() {
  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    swal({
      title: "Apakah anda yakin?",
      text: "Anda akan keluar dari halaman ini",
      icon: "warning",
      button: true,
      dangerMode: true,
    }).then(() => {
      localStorage.clear()
      dispatch(logOut())
      swal('anda berhasil keluar', {
        icon: 'success',
        button: false,
        timer: 1000
      })
      history.push('/')
    })
  }

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
      <div className="collapse navbar-collapse " id="navbarNav">
        <ul className="navbar-nav ml-auto d-flex align-items-center">
          <li className="nav-item ">
            <Link className="nav-link" to="/dashboard">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <button
              className="nav-link btn btn-danger"
              onClick={() => logout()}
              style={{ color: '#fff' }}>
              Log out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
