import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Navbar } from '../components/'
import AddIcon from '../assets/patient.png'
import { addPatient } from '../store/index'

function FormPatient() {

  const [input, setInput] = useState({
    nik: '',
    name: '',
    email: '',
    birth_date: '',
    address: ''
  })

  const valueChange = (e) => {

    let {name, value} = e.target 

    let newInput = {
      ...input,
      [name] : value
    }

    setInput(newInput)
  }

  const dispatch = useDispatch()

  const handleForm = (e) => {
    e.preventDefault()
    dispatch(addPatient(input))
  }

  return (
    <div>
      <Navbar />
      {JSON.stringify(input)}
      <div className="form-add">
        <div className="d-flex justify-content-center flex-nowrap">
          <div className="row">
            <img src={AddIcon} alt="patient" />
          </div>
        </div>
        <div>
          <h3 className="text-center">Tambah Data Pasien</h3>
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
                    placeholder="Nama Lengkap"
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
                    type="text"
                    name="birth_date"
                    className="form-control"
                    placeholder="Tanggal Lahir"
                    onChange={valueChange}
                    value={input.birth_date}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Alamat"
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
