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
  }, [dispatch])

  const patientsList = useSelector((state) => state.listPatients)

  return (
    <div>
      <Navbar />
      <div className="list-patient mt-5">
        <div className="container">
          <h1>List of Patients</h1>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {patientsList.map((el, i) => (
                <tr key={el.id}>
                  <th scope="row" className="align-middle text-center">
                    {i + 1}
                  </th>
                  <td className="align-middle">{el.name}</td>
                  <td className="align-middle">{el.email}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      className="btn btn-success"
                      onClick={() => navToDetails(el.id)}>
                      See Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListPatient
