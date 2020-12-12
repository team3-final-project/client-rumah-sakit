import React from 'react'
import { Navbar } from '../components/'
import AddIcon from '../assets/patient.png'

function FormPatient() {
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
          <h3 className="text-center">Tambah Data Pasien</h3>
        </div>
        <div className="d-flex justify-content-center">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NIK"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama Lengkap"
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
