import React from 'react'
import logo from '../assets/logo.png'

function Login() {
  return (
    <div className="login-page mb-5">
      <div className=" container">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <p className="text-center">Please login first</p>
        <div className="d-flex justify-content-center">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="btn btn-success btn-block">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
