import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const initalState = {
    isLoggedIn: false,
    profile: [],
    listPatients: [],
    patientRecords: [],
    patientProfile: []
}

export function hospitalLogin(input) {
    return (dispatch) => {
        fetch('http://20.20.22.92:3000/hospital/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: input.name,
                password: input.password
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        })
        .then(data => {
            dispatch({ type: 'hospital_login', payload: data.access_token })
        })
    }
}

export function addPatient(input) {
    const access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        console.log(input)
        fetch('http://20.20.22.92:3000/hospital/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                access_token: access_token
            },
            body: JSON.stringify(input)
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        })
        .then(data => {
            swal({ 
                title: 'Success!',
                text: 'Data has been added',
                icon: 'success', 
                button: false,
                timer: 1000
              })
            const db = firebase.firestore()
            
            await db.collection('refetching-med').doc('zpeLfcCi7dRIpgV8DhMi').update({
                refetching: true
            })
            dispatch({ type: 'add_patient', payload: data })
        })
    }
}

export function getProfile() {
    const access_token = localStorage.getItem('access_token')
    
    return (dispatch) => {
        console.log('1')
        fetch('http://20.20.22.92:3000/hospital', {
            method: 'get',
            headers: {
                access_token: access_token
            }
        })
        .then(response => {
            console.log('2')
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        })
        .then(data => {
            dispatch({ type: 'fetch_profile', payload: data })
        })
    }
}

export function getPatients() {
    const access_token = localStorage.getItem('access_token')
    
    return (dispatch) => {
        fetch( `http://20.20.22.92:3000/hospital/patients`, {
            method: 'GET',
            headers: {
                access_token: access_token
            }
        })
        .then(response => {
            console.log('masuk getpatient1')
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        })
        .then(data => {
            console.log('masuk getpatient', data)
            dispatch({ type: 'fetch_patients', payload: data })
        })
    }
}

export function getPatientRecords(params) {
    const access_token = localStorage.getItem('access_token')
    
    return (dispatch) => {
        fetch(`http://20.20.22.92:3000/hospital-record/${params}`, {
            method: 'GET',
            headers: {
                access_token: access_token
            }
        })
        .then(response => {
            console.log('beess')
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        })
        .then(data => {
            console.log(data)
            dispatch({ type: 'fetch_patient_records', payload: data })
        })
    }
}

export function createRecord(input) {
    const access_token = localStorage.getItem('access_token')
    console.log(input)
    return (dispatch) => {
        fetch('http://20.20.22.92:3000/hospital-record', {
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
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        })
        .then(data => {
            dispatch({ type: 'create_record', payload: data.access_token })
        })
    }
}

export function deleteRecord() {
    const access_token = localStorage.getItem('access_token')

    return (dispatch) => {
        fetch('http://20.20.22.92:3000/hospital-record', {
            method: 'delete',
            headers: {
                access_token: access_token
            },
            data: {

            }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        })
        .then(data => {
            dispatch({ type: 'delete_record', payload: data.access_token })
        })
    }
}

export function logOut() {
    return (dispatch) => {
        dispatch({ type: 'logout' })
    }
}

const reducer = ( state = initalState, action ) => {
    switch (action.type) {
        case 'hospital_login': 
            localStorage.setItem('access_token', action.payload)
            return { ...state, isLoggedIn: true}
        case 'add_patient':
            return state
        case 'fetch_profile':
            return { ...state, profile: action.payload }
        case 'fetch_patients':
            return { ...state, listPatients: action.payload }
        case 'fetch_patient_records':
            const patientProfile = action.payload[0].Patient 
            return { ...state, patientRecords: action.payload, patientProfile: patientProfile }
        case 'create_record':
            return state
        case 'delete_record':
            return state
        case 'logOut':
            return { ...state, isLoggedIn: false}
        default:
            return state
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
    )
)

export default store

