import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth ,db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useEffect,useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await signOut(auth);  
    console.log("User signed out");
    navigate('/')
  } catch (err) {
    console.error("Logout Error:", err.message);
  }
};



useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setIsAdmin(docSnap.exists() && docSnap.data().role === "admin");
      } else {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [user]);


  return (
    
<nav className="fixed top-0 left-0 right-0 z-50 mx-auto w-5/6 max-w-7xl px-3 py-2 mt-6 bg-white/40 backdrop-blur-md border border-neutral-300 rounded-4xl shadow-md">
  <div className="flex items-center justify-between flex-wrap">
  
  <div className=' bg-gradient-to-r from-orange-600 via-pink-400 to-violet-600 text-transparent bg-clip-text font-bold '>shipNtrack</div>
        
         <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 hover:text-indigo-600 focus:outline-none sm:hidden"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        
       <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full sm:flex sm:items-center sm:justify-end sm:space-x-4 sm:w-auto mt-4 sm:mt-0`}
        >
          <Link to="/home" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Home</Link>
          <Link to="/createshipment" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Create Shipment</Link>
          <Link to="/trackshipment" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Track My Shipment</Link>
          {isAdmin && (
            <Link to="/admin" className="block  text-gray-700 hover:text-indigo-600">Admin Dashboard</Link>
          )}
          {auth?.currentUser ? (
            <button onClick={handleLogout} className="block text-gray-700 hover:text-red-600">Logout</button>
          ) : (
            <Link to="/login" className="block  text-gray-700 hover:text-indigo-600">Login</Link>
          )}
        </div>
        </div>
    </nav>
       

    



  );
};

export default Navbar;
