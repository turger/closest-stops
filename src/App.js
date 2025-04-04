import './App.css'
import LeafletMapStops from './components/LeafletMapStops'
import Pagewrapper from './components/Pagewrapper'
import Stops from './components/Stops'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
        <Route index element={<LeafletMapStops />} />
      </Route>
    </Routes>
  </Router>
)

export default App
