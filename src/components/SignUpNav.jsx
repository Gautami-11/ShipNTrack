import React from 'react'
import logo from "../assets/logo.png"

const SignUpNav = () => {
  return (
    <div className=' text  mb-6 fixed top-0 w-full '>
       
        <nav className='  border border-neutral-300 flex p-3 m-4 rounded-4xl  bg-white/40 backdrop-blur-md shadow-md' >
     
<img
  src={logo}
  className="h-9 ml-5 w-auto scale-130"
  alt="Logo"
/>
<h1 className='ml-5 text-2xl font-extrabold'>shipNTrack </h1>
</nav>


    </div>
  )
}

export default SignUpNav

