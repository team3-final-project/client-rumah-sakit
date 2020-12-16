import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createRecord } from '../store/index'
import firebase from '../firebase'

function Modal(props) {
  const dispatch = useDispatch()

  const id = +props.components

  const [test, setTest] = useState('')
  const [date, setDate] = useState('')
  const [fileName, setFileName] = useState('Choose File')
  const [fileUrl, setFileUrl] = useState('')
  const [files, setFiles] = useState(null)

  const handleImportFile = (event) => {
    setFiles(event.target.files[0])
    setFileName(event.target.files[0].name)
  }

  const handlePostImport = async () => {
    let file = files
    let bucketName = 'files'
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
    // let fileRef = storageRef.child(file.name);
    await storageRef.put(file)
    setFileUrl(await storageRef.getDownloadURL())
  }

  const handleForm = (e) => {
    e.preventDefault()
    dispatch(
      createRecord({
        id: id,
        type_test: test,
        date: date,
        file: fileUrl
      })
    )
    setTest('')
    setDate('')
    setFiles(null)
    setFileUrl('')
    setFileName('Choose File')
  }

  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Tes Medis
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {fileUrl && (
              <div class="alert alert-success" role="alert">
                File Berhasil di Upload
              </div>
            )}
            <form onSubmit={handleForm}>
              <div className="form-group">
                <label>Nama Tes: </label>
                <input
                  placeholder="Masukkan Nama Test"
                  name="type_test"
                  type="text"
                  className="form-control"
                  id="diagnosa"
                  onChange={(e) => setTest(e.target.value)}
                  value={test}
                />
              </div>
              <label>Tanggal Hasil Tes: </label>

              <div className="form-group">
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
              </div>

              <div className="input-group mb-3">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile02"
                    onChange={handleImportFile}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile02"
                    aria-describedby="inputGroupFileAddon02">
                    {fileName}
                  </label>
                </div>
                <div className="input-group-append">
                  <span
                    className="input-group-text btn btn-primary"
                    id="inputGroupFileAddon02"
                    onClick={() => handlePostImport()}>
                    Upload
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success btn-block"
                data-dismiss="modal"
                onClick={(e) => handleForm(e)}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
