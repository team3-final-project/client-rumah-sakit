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

  const { profile, data } = constants

  return (
    <div>
      <Navbar />
      {!profile || !data ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-dark text-center" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="profile-hospital">
          <div className="container">
            <div className="img-frame">
              <img src={avatarHospital} alt="doc-avatar" />
            </div>
            <div className="card">
              <h1>{profile.name}</h1>
              <p className="display-6">Address: {profile.address}</p>
              <p className="display-6">
                Total of Patient: 10
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileHospital
