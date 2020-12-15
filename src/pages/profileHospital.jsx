import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProfile } from '../store/index'
import avatarHospital from '../assets/hospital-avatar.png'
import { Navbar } from '../components'
function ProfileHospital() {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  const constants = useSelector((state) => state.profile)

  const {profile, data} = constants

  if(!profile || !data) {
    return (<p>Waitinggg</p>)
  }

  return (
    <div>
      <Navbar />
      <div className="profile-hospital">
        <div className="container">
          <div className="img-frame">
            <img src={avatarHospital} alt="doc-avatar" />
          </div>
          <div className="card">
            <h1>{profile.name}</h1>
            <p className="display-6">Alamat: {profile.address}</p>
            <p className="display-6">Jumlah Pasien: {data[0]["Jumlah Patient"]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHospital
