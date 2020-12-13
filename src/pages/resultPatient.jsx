import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar } from '../components/'
import avatar from '../assets/man.png'
import { getPatientRecords } from '../store/index'
import { useHistory } from 'react-router-dom'
import { Modal } from '../components/index'


function ResultPatient() {
  
  const dispatch = useDispatch()

  const history = useHistory()
  const params = history.location.state

  useEffect(() => {
    dispatch(getPatientRecords(params))
  }, [])

  const records = useSelector((state) => state.patientRecords)
  const patientProfile = useSelector((state) => state.patientProfile)

  return (
    <div>
      <Navbar />
      <div className="result-patient">
        <div className="container">
          <h1>Data Pasien</h1>
          <div className="profile">
            <div className="row">
              <div className="col-2">
                <img src={avatar} alt="" className="mx-auto" />
              </div>
              <div className="col-10">
                <h3>{patientProfile.name}</h3>
                <p>{Date(patientProfile.birth_date)}</p>
                <p>{patientProfile.address}</p>
              </div>
            </div>
            <div className="diag-btn">
              <button
                type="button"
                className="btn btn-success"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                <i className="fas fa-plus"></i> Record
              </button>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Test Type</th>
                  <th scope="col">File</th>
                  <th scope="col">Released date</th>
                </tr>
              </thead>  
              <tbody>
                {records.map((el, i) => (
                  <tr>
                    <th scope="row">{i+1}</th>
                    <td>{el.type_test}</td>
                    <td>{el.file}</td>
                    <td>{el.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal components={params}/>
      </div>
    </div>
  )
}

export default ResultPatient
