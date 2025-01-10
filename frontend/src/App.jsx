import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/Login'
import Signup  from './pages/Signup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup  from './pages/CaptainSignup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/'element={<Home/>} />
        <Route path='/login'element={<Login/>}/>
        <Route path='/signup'element={<Signup/>}/>
        <Route path='/captain-login'element={<Captainlogin/>}/>
        <Route path='/captain-signup'element={<CaptainSignup/>}/>
      </Routes>
    </div>
  )
}

export default App