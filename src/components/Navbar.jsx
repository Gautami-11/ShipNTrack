import React from 'react';
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { auth ,db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useEffect,useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  
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
     <div class="fixed top-0 w-full z-50 mb-6">
  <nav class="flex items-center gap-6 font-semibold px-6 py-3 m-4 border border-neutral-300 rounded-3xl bg-white/40 backdrop-blur-md shadow-md">
    
   <img
         src={logo}
         className="h-9 ml-5 w-auto scale-130"
         alt="Logo"
       />
        <Link to="/home">Home</Link>
       <Link to="/createshipment">CreateShipment </Link>
       <Link to="/trackshipment">TrackShipment</Link>
        {isAdmin && <Link to="/admin">Admin Dashboard</Link>}
    
      {auth.currentUser ? (<button onClick={handleLogout}>Logout </button>) : ( <Link to="/login" >Login</Link>)
      }
    </nav>
    </div>



  );
};

export default Navbar;
