
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db ,googleProvider } from "../config/firebase";
import {  doc,setDoc, getDoc,serverTimestamp, } from 'firebase/firestore';
import SignUpNav from '../components/SignUpNav';


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  


  //save user data in database
  const saveUserDoc = async (user) => {


    const ref = doc(db, "users", user.uid);    
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        email: user.email,
        displayName: user.displayName || "",
        createdAt: serverTimestamp(),
      });
    }
  };


  const createUser = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserDoc(cred.user);     // ✅ save in Firestore
      alert("Registered successfully!");
      navigate("/home");
    } catch (err) {
      alert("Registration Error: " + err.message);
    }
  };


  const signInWithGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      await saveUserDoc(cred.user);     // ✅ save in Firestore
      navigate("/home");
    } catch (err) {
      alert("Google Sign-In Failed: " + err.message);
    }
  };


  return (
    <div className="pt-24 text">
<div className="fixed w-auto z-50 top-0">
  <SignUpNav/>
</div>

<div
  className="min-h-screen text bg-cover  bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/bgimg.png')" }} 
>
  <div className="bg-white/70 backdrop-blur-sm min-h-screen">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-4 px-6 py-10">
      {/* Left side*/}
      <div className="text-center lg:text-left">
       
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Create your account &{' '}
          <span className="bg-gradient-to-r from-orange-600 via-pink-400 to-violet-600 text-transparent bg-clip-text">
            start tracking instantly.   </span>
        </h1>
      </div>


    
           <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
    <form   className="space-y-4 font-semibold" onSubmit={(e) => { e.preventDefault(); createUser(); }}>
      <label>Email</label>
      <input
        type="email"
        placeholder="Enter email"
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            
          autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            
        value={password}
         autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
         type="submit">Register</button>
    </form>

    <div className="text-center text-gray-600 p-4">OR</div>

      <div className="w-full">
        
    <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-md font-semibold hover:bg-gray-100 transition"
   onClick={signInWithGoogle}>  <img
      src="https://developers.google.com/identity/images/g-logo.png"
      alt="Google Logo"
      className="h-5 w-5"
    />Register with Google</button>

    <p className="text-sm text-center mt-4 text-gray-700">
           Already have an account?{' '}
            <a href="/" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>
    </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  );
};

export default Register;
