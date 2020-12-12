import React from 'react'
import { Navbar } from '../components/'
import avatar from '../assets/man.png'

function ResultPatient(params) {
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
                <h3>M. Dicky Andeyan Naratama</h3>
                <p>Cianjur, 24 Desember 1995</p>
                <p>Komplek GBA-2 Blok J5 no 32, Kab. Bandung</p>
              </div>
            </div>
            <div className="diag-btn">
              <div class="custom-file w-25">
                <input type="file" class="custom-file-input" id="customFile" />
                <label class="custom-file-label" for="customFile">
                  Choose file
                </label>
              </div>
              <button className="btn btn-success ml-3">Upload</button>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultPatient
