import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar } from '../components/'
import { getPatients } from '../store/index'
import { useHistory } from 'react-router-dom'

function ListPatient() {
  const history = useHistory()
  function navToDetails(params) {
    history.push({
      pathname: '/result-patient', 
      state: params
    })
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPatients())
  }, [])

  const patientsList = useSelector((state) => state.listPatients)

  return (
    <div>
      <Navbar />
      <div className="list-patient mt-5">
        <div className="container">
          <h1>Daftar Pasien</h1>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">No</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {patientsList.map(el => (
                <tr key={el.id}>
                  <th scope="row">{el.id}</th>
                  <td>{el.name}</td>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td className="d-flex justify-content-center">
                    <button className="btn btn-success" onClick={() => navToDetails(el.id)}>
                      See Details
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td className="d-flex justify-content-center">
                  <button className="btn btn-success">See Details</button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td className="d-flex justify-content-center">
                  <button className="btn btn-success">See Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListPatient
