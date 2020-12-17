import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navbar } from '../components/'
import AddIcon from '../assets/patient.png'
import { addPatient } from '../store/index'
import { useHistory } from 'react-router-dom'

function FormPatient() {

  const history = useHistory()
  const [input, setInput] = useState({
    nik: '',
    name: '',
    email: '',
    birth_date: '',
    address: ''
  })

  const valueChange = (e) => {

    let { name, value } = e.target

    let newInput = {
      ...input,
      [name]: value
    }

    setInput(newInput)
  }

  const dispatch = useDispatch()

  const handleForm = (e) => {
    e.preventDefault()
    dispatch(addPatient(input))
    setTimeout(() => {
      history.push('/dashboard')
    }, 2150);
  }

  return (
    <div>
      <Navbar />
      <div className="form-add">
        <div className="d-flex justify-content-center flex-nowrap">
          <div className="row">
            <img src={AddIcon} alt="patient" />
          </div>
        </div>
        <div>
          <h3 className="text-center">Insert new patient</h3>
        </div>
        <div className="d-flex justify-content-center">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleForm}>
                <div className="form-group">
                  <input
                    type="text"
                    name="nik"
                    className="form-control"
                    placeholder="NIK"
                    onChange={valueChange}
                    value={input.nik}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Full name"
                    onChange={valueChange}
                    value={input.name}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={valueChange}
                    value={input.email}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    name="birth_date"
                    className="form-control"
                    placeholder="Birth date"
                    onChange={valueChange}
                    value={input.birth_date}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Address"
                    onChange={valueChange}
                    value={input.address}
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

export default FormPatient
