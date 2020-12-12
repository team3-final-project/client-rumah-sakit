import React from 'react'
import avatarHospital from '../assets/hospital-avatar.png'
import { Navbar } from '../components'
function ProfileHospital() {
  return (
    <div>
      <Navbar />
      <div className="profile-hospital">
        <div className="container">
          <div className="img-frame">
            <img src={avatarHospital} alt="doc-avatar" />
          </div>
          <div className="card">
            <h1>Rumah Sakit Hasan Sadikin</h1>
            <p className="display-6">Alamat: Kota Bandung</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHospital
