
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registered successfully!");
      navigate("/home");
    } catch (err) {
      alert("Registration Error: " + err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      alert("Google Sign-In Failed: " + error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>

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
    </div>
  );
};

export default Register;
