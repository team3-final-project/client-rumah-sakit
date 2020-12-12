import React from 'react'
import {
  Login,
  Dashboard,
  FormPatient,
  ResultPatient,
  ProfileHospital,
  ListPatient
} from './pages/'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/add-patient">
          <FormPatient />
        </Route>
        <Route path="/result-patient">
          <ResultPatient />
        </Route>
        <Route path="/list-patient">
          <ListPatient />
        </Route>
        <Route path="/profile-hospital">
          <ProfileHospital />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
