import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import firebase from '../firebase.js'
import swal from 'sweetalert'

const db = firebase.firestore()

const initalState = {
  isLoggedIn: false,
  profile: [],
  listPatients: [],
  patientRecords: [],
  hospitalRec: []
}

export function hospitalLogin(input) {
  return (dispatch) => {
    fetch('http://192.168.1.71:3001/hospital/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: input.name,
        password: input.password
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('something went wrong!')
        }
      })
      .then((data) => {
        swal({
          title: 'Success!',
          text: 'Welcome back!',
          icon: 'success',
          buttons: false,
          timer: 2000
        })
        dispatch({ type: 'hospital_login', payload: data.access_token })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function addPatient(input) {
  const access_token = localStorage.getItem('access_token')
  return (dispatch) => {
    console.log(input)
    fetch('http://192.168.1.71:3001/hospital/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: access_token
      },
      body: JSON.stringify(input)
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('something went wrong!')
        }
      })
      .then((data) => {
        swal({
          title: 'Success!',
          text: 'New patient added successfully!',
          icon: 'success',
          button: false,
          timer: 2100
        })
        dispatch({ type: 'add_patient', payload: data })
      })
  }
}

export function getProfile() {

  const access_token = localStorage.getItem('access_token')

  return (dispatch) => {
    console.log('1')
    fetch('http://192.168.1.71:3001/hospital', {
      method: 'get',
      headers: {
        access_token: access_token
      }
    })
      .then((response) => {
        console.log('2')
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('something went wrong!')
        }
      })
      .then((data) => {
        dispatch({ type: 'fetch_profile', payload: data })
      })
  }
}

export function getPatients() {
  const access_token = localStorage.getItem('access_token')

  return (dispatch) => {
    fetch(`http://192.168.1.71:3001/hospital/patients`, {
      method: 'GET',
      headers: {
        access_token: access_token
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('something went wrong!')
        }
      })
      .then((data) => {
        dispatch({ type: 'fetch_patients', payload: data })
      })
  }
}

export function getPatientRecords(params) {
  console.log('here')
  const access_token = localStorage.getItem('access_token')

  return (dispatch) => {
    fetch(`http://192.168.1.71:3001/hospital-record/${params}`, {
      method: 'GET',
      headers: {
        access_token: access_token
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('something went wrong!')
        }
      })
      .then((data) => {
        console.log('heheheeh', data)
        dispatch({ type: 'fetch_patient_records', payload: data })
      })
  }
}

export function createRecord(input) {
  const access_token = localStorage.getItem('access_token')
  return (dispatch) => {
    fetch('http://192.168.1.71:3001/hospital-record', {
      method: 'post',
      headers: {
        access_token: access_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type_test: input.type_test,
        date: input.date,
        file: input.file,
        PatientId: input.id
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('something went wrong!')
        }
      })
      .then(async (data) => {
        const db = firebase.firestore()

        await db
          .collection('refetching-hospital')
          .doc('G5wSLIctbTspSTPqPmAp')
          .update({
            refetching: true
          })

        swal({
          title: 'Success!',
          text: 'Test added successfully',
          icon: 'success',
          button: false,
          timer: 1000

        })
        dispatch({ type: 'create_record', payload: data.access_token })
      })
  }
}

export function deleteRecord(params) {
  const access_token = localStorage.getItem('access_token')

  return (dispatch) => {
    fetch(`http://192.168.1.71:3001/hospital-record/${params}`, {
      method: 'delete',
      headers: {
        access_token: access_token
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('something went wrong!')
        }
      })
      .then((data) => {
        dispatch({ type: 'delete_record', payload: data.access_token })
      })
  }
}

export function logOut() {
  return (dispatch) => {
    dispatch({ type: 'logout' })
  }
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case 'hospital_login':
      localStorage.setItem('access_token', action.payload)
      return { ...state, isLoggedIn: true }
    case 'add_patient':
      return state
    case 'fetch_profile':
      return { ...state, profile: action.payload }
    case 'fetch_patients':
      return { ...state, listPatients: action.payload }
    case 'fetch_patient_records':
      return {
        ...state,
        patientRecords: action.payload,
        hospitalRec: action.payload.HospitalRecords
      }
    case 'create_record':
      return state
    case 'delete_record':
      return state
    case 'logout':
      return { ...state, isLoggedIn: false }
    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
