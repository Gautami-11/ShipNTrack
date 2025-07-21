import React from 'react'
import {  signOut } from "firebase/auth";
import Navbar from '../components/Navbar';
import {auth} from '../config/firebase'


const Home = () => {
   const user = auth.currentUser;
   
  return (
    <div >
         <Navbar user={user} signOut={() => signOut(auth)} />
      <h1 className='pt-24'>HOME PAGE</h1>
      <h1 className='pt-24'>HOME PAGE</h1>   </div>
  )
}

export default Home
