import React from 'react';
import { Link } from 'react-router-dom';



const Navbar = ({ user, signOut }) => {
  return (
    <nav className='bg-amber-300' style={{ display: "flex", gap: "10px", padding: "10px", }}>
      <Link to="/home">Home</Link>
       <Link to="/trackshipment">TrackShipment</Link>
      {!user && <Link to="/">Login</Link>}
      {!user && <Link to="/register">Register</Link>}
      {user && <button onClick={signOut}>Logout</button>}
    </nav>
  );
};

export default Navbar;
