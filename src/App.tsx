import React, { useState } from 'react'
import "./assets/styles/styles.scss"
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/home'
import ProfilePage from './pages/profile/profile'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cofee/:cafee_id'>
          <Route index element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
