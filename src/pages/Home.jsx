import React from 'react'
import {  signOut } from "firebase/auth";
import Navbar from '../components/Navbar';
import {auth} from '../config/firebase'


const Home = () => {
   const user = auth.currentUser;
   
  return (
    <div className='bg-amber-200'>
         <Navbar user={user} signOut={() => signOut(auth)} />
      <h1>HOME PAGE</h1>
    </div>
  )
}

export default Home
