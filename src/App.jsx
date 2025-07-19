import Register from './pages/Register'
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from "./components/ProtectedRoute"; 
import './App.css'
import TrackShipment from './pages/TrackShipment';
import {BrowserRouter as Router ,Routes ,Route , Navigate } from "react-router-dom";
import NewShipment from './pages/NewShipment';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';



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


                <Route
          path="/createshipment"
          element={
            <ProtectedRoute>
              <NewShipment/>
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={
  <AdminRoute>
    <AdminDashboard />
  </AdminRoute>
} />
      </Routes>
    </Router>
  )
}

export default App
