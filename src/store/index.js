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
        console.log('2')
        fetch('http://localhost:3000/hospital/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Hospital 1',
                password: '1234'
            })
        })
        .then(response => {
            console.log('3')
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        })
        .then(data => {
            console.log('4', data)
            dispatch({ type: 'hospital_login', payload: data.access_token })
        })
    }
}

export function getProfile() {
    const access_token = localStorage.getItem('access_token')
    
    return (dispatch) => {
        console.log('1')
        fetch('http://localhost:3000/hospital', {
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
            console.log('3', data)
            dispatch({ type: 'fetch_profile', payload: data })
        })
    }
}

export function getPatients() {
    const access_token = localStorage.getItem('access_token')
    
    return (dispatch) => {
        console.log('masuk getpatient')
        fetch( `http://localhost:3000/hospital/patients`, {
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
        fetch(`http://localhost:3000/hospital-record/${params}`, {
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

export function createRecord() {
    const access_token = localStorage.getItem('access_token')

    return (dispatch) => {
        fetch('http://localhost:3000/hospital-record', {
            method: 'post',
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
            dispatch({ type: 'create_record', payload: data.access_token })
        })
    }
}

export function deleteRecord() {
    const access_token = localStorage.getItem('access_token')

    return (dispatch) => {
        fetch('http://localhost:3000/hospital-record', {
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

const reducer = ( state = initalState, action ) => {
    switch (action.type) {
        case 'hospital_login': 
            localStorage.setItem('access_token', action.payload)
            return { ...state, isLoggedIn: true}
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

