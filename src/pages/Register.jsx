
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db ,googleProvider } from "../config/firebase";
import {  doc,setDoc, getDoc,serverTimestamp, } from 'firebase/firestore';



const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const createUser = async () => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     alert("Registered successfully!");
  //     navigate("/home");
  //   } catch (err) {
  //     alert("Registration Error: " + err.message);
  //   }
  // };

  // const signInWithGoogle = async () => {
  //   try {
  //     await signInWithPopup(auth, googleProvider);
  //     navigate("/home");
  //   } catch (error) {
  //     alert("Google Sign-In Failed: " + error.message);
  //   }
  // };




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

  // 🟦 Google Sign In
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
    <div>
      {/* <h1>Register</h1>

       <label>Email</label>
      <input
        type="email"
        placeholder="Enter email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

       <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={createUser}>Register</button>
      <p>OR</p>
      <button onClick={signInWithGoogle}>Register with Google</button>
    </div> */}

     <h1>Register</h1>
    <form onSubmit={(e) => { e.preventDefault(); createUser(); }}>
      <label>Email</label>
      <input
        type="email"
        placeholder="Enter email"
        required
          autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        required
        value={password}
         autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Register</button>
    </form>

    <p>OR</p>
    <button onClick={signInWithGoogle}>Register with Google</button>
  </div>
  );
};

export default Register;
