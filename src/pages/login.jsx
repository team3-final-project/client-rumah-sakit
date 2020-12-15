import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { hospitalLogin } from '../store/index'
import logo from '../assets/logo.png'

function Login() {

  const dispatch = useDispatch()
  const history = useHistory()

  const [input, setInput] = useState({
    name: '',
    password: ''
  })

  const valueChange = (e) => {

    let {name, value} = e.target 

    let newInput = {
      ...input,
      [name] : value
    }

    setInput(newInput)
  }
  const isLoggedIn = useSelector((state) => state.isLoggedIn)

  useEffect(() => {
    if(isLoggedIn) {
      history.push('/dashboard')
    }
  }, [isLoggedIn])

  const handleForm = (e) => {
    e.preventDefault()
    dispatch(hospitalLogin(input))
  }

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
              <form onSubmit={handleForm}>
                <div className="form-group">
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Hospital name"
                    onChange={valueChange}
                    value={input.name}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={valueChange}
                    value={input.password}
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
