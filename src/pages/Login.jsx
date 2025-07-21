import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup ,signInWithEmailAndPassword } from "firebase/auth";
import SignUpNav from "../components/SignUpNav";
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
          Login to track your{' '}
          <span className="bg-gradient-to-r from-orange-600 via-pink-400 to-violet-600 text-transparent bg-clip-text">
            orders easily
          </span>
        </h1>
      </div>

      {/* Right side */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            onClick={LogInWithEmailAndPass}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          >
            Log In
          </button>

          <div className="text-center text-gray-600">OR</div>

          
        <div className="w-full">
  <button
    type="button"
    onClick={LogInWithGoogle}
    className="w-full flex items-center justify-center gap-2 border py-2 rounded-md font-semibold hover:bg-gray-100 transition"
  >
    <img
      src="https://developers.google.com/identity/images/g-logo.png"
      alt="Google Logo"
      className="h-5 w-5"
    />
    <span>Login with Google</span>
  </button>
</div>


          <p className="text-sm text-center mt-4 text-gray-700">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
</div>
  )
};

export default Login;
