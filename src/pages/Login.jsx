import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup ,signInWithEmailAndPassword } from "firebase/auth";

import { auth, googleProvider } from "../config/firebase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LogInWithGoogle  = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home"); 
    } catch (error) {
      console.error("Login failed", error.message);
    }
  };


  const LogInWithEmailAndPass = async () =>{
    try {
      await signInWithEmailAndPassword(auth,email,password );
      navigate("/home");
    } catch (error) {
       console.error("Email Login failed:", error.message);
      alert("Login failed: " + error.message);
    }
  }

  return (
    <div>
      <h1>LOGIN</h1>
<form  onSubmit={(e) => { e.preventDefault();  } } >
  
      <label>Email</label>
      <input type="email" 
      value={email}
      autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
      required placeholder="Enter your email" />

      <label>Password</label>
      <input type="password" 
       value={password}
       autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
        required placeholder="Enter your Password" />

      <button onClick={LogInWithEmailAndPass}> LogIn</button>

      <p>OR</p>

      <button onClick={LogInWithGoogle}>Login with Google</button>

      <p>
        Don't have an account? <a href="/register">Register here</a>
  
   </p>

</form>

</div>
  );
};

export default Login;
