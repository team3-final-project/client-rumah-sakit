import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function Modal() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [ input, setInput ] = useState({
    type_test: '',
    file: '',
    date: ''
  })

  const handleSubmitDiagnose = (e) => {
    e.preventDefault();
    dispatch(
      addNewMedicalRecord(id, date, diagnose, medicineName, dosis, jumlahObat)
    )
  };

  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Tambah Diagnosa
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => handleSubmitDiagnose(e)}>
              <div className="form-group">
                <div className="col">
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <label>Diagnosa: </label>
                <textarea
                  className="form-control"
                  id="diagnosa"
                  rows="3"
                  value={diagnose}
                  onChange={(e) => setDiagnose(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Obat: </label>
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Jenis Obat"
                      value={medicineName}
                      onChange={(e) => setMedicineName(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Dosis"
                      value={dosis}
                      onChange={(e) => setDosis(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Jumlah"
                      value={jumlahObat}
                      onChange={(e) => setJumlahObat(e.target.value)}
                    />
                  </div>
                </div>
                {/* <button className="btn btn-dark btn-block mt-1">
                  <i className="fas fa-plus"></i> Tambah Obat
                </button> */}
              </div>
              <button
                type="submit"
                className="btn btn-success btn-block"
                data-dismiss="modal"
                onClick={(e) => handleSubmitDiagnose(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
