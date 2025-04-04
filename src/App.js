import React from 'react'
import Stops from './components/Stops'
import Map from './components/map/Map'
import Pagewrapper from './components/Pagewrapper'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

const App = () => (
  <Router
    future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true
    }}
  >
    <Routes>      
      <Route path="/favorites" element={<Pagewrapper />}>
        <Route index element={<Stops onlyFavorites={true} />} />
      </Route>
      
      <Route path="/" element={<Pagewrapper />}>
        <Route index element={<Stops />} />
      </Route>

      <Route path="/all" element={<Pagewrapper />}>
        <Route index element={<Stops />} />
      </Route>
      
      <Route path="/map" element={<Pagewrapper />}>
        <Route index element={<Map />} />
      </Route>
    </Routes>
  </Router>
)

export default App
