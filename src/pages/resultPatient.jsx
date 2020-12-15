import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar } from '../components/'
import avatar from '../assets/man.png'
import { getPatientRecords } from '../store/index'
import { useHistory } from 'react-router-dom'
import { Modal } from '../components/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'
import { deleteRecord } from '../store/index'
import firebase from '../firebase'

function ResultPatient() {

  const dispatch = useDispatch()
  const history = useHistory()
  const params = history.location.state

  const handleDeletePatientRecord = (params) => {
    swal({
      title: 'Apakah anda yakin?',
      text: 'Data akan terhapus secara permanen',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(() => {
      dispatch(deleteRecord(params))
      swal('Data berhasil dihapus', {
        icon: 'success',
        button: false,
        timer: 1000
      })
    })
  }

  useEffect(() => {
    dispatch(getPatientRecords(params))
  }, [])

  const data = useSelector((state) => state.patientRecords)
  const hospitalRec = useSelector((state) => state.hospitalRec)

  const db = firebase.firestore()

  db.collection('refetching-hospital').doc('G5wSLIctbTspSTPqPmAp').onSnapshot(snapshot => {
    refetchingData()
  })

  const refetchingData = async () => {
    let data = false
    await db.collection('refetching-hospital').doc('G5wSLIctbTspSTPqPmAp').get().then(value => {
      data = value.data().refetching
    })
    if(data){
      dispatch(getPatientRecords(params))
    }
    await db.collection('refetching-hospital').doc('G5wSLIctbTspSTPqPmAp').update({
      refetching: false
    })
  }

  if(!data) {
    return <p>Loading...</p>
  }

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
                <h3>{data.name}</h3>
                <p>{Date(data.birth_date)}</p>
                <p>{data.address}</p>
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
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hospitalRec.map((el, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{el.type_test}</td>
                    <td>
                      <img alt={"img"} src={el.file} />
                    </td>
                    <td>{el.date}</td>
                    <td className="d-flex justify-content-center">
                      <FontAwesomeIcon
                        onClick={() =>
                          handleDeletePatientRecord(el.id)}
                        role="button"
                        icon={faTrash}
                        color="#C80000" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal components={params} />
      </div>
    </div>
  )

}

export default ResultPatient
