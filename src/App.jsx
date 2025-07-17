import Register from './pages/Register'
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from "./components/ProtectedRoute"; 
import './App.css'
import TrackShipment from './pages/TrackShipment';
import {BrowserRouter as Router ,Routes ,Route , Navigate } from "react-router-dom";






function App() {


  return (
  

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trackshipment"
          element={
            <ProtectedRoute>
              <TrackShipment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
