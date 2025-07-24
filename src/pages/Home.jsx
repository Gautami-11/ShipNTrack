import React from 'react'
import {  signOut } from "firebase/auth";
import Navbar from '../components/Navbar';
import {auth} from '../config/firebase'
import Footer from '../components/Footer';

const Home = () => {
   const user = auth.currentUser;
   
const steps = [
  {
    title: "Order Received",
    description: "Your order has been received by your courier partner",
    icon: "/orderreceived.png",
  },
  {
    title: "Order Picked",
    description: "Your order has been picked up by your courier partner",
    icon: "/orderpicked.png",
  },
  {
    title: "Order In Transit",
    description: "Your order is on its way to your customer's address",
    icon: "/ordertransit.png",
  },
  {
    title: "Out For Delivery",
    description: "The courier is on the way to your customer’s doorstep",
    icon: "/orderdelivery.png",
  },
  {
    title: "Reached Destination",
    description: "Your order has reached your customer’s city",
    icon: "/orderdelivered.png",
  },
];


  return (
    <div  className='h-screen text overflow-y-scroll custom-scrollbar-hide'>
         <Navbar user={user} signOut={() => signOut(auth)} />
          <div
  className=" bg-cover text h-auto bg-fixed  bg-center bg-no-repeat transition duration-300"
  style={{ backgroundImage: "url('/bgimg.png')" }} 
>
     <div className="bg-white/70 backdrop-blur-sm min-h-screen pt-28">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-4 px-6 py-10">
      {/* Left side*/}
     <div className="text-center px-4 py-8">
  <span className="block bg-gradient-to-r from-orange-600 via-pink-400 to-violet-600 text-transparent bg-clip-text font-bold text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ">
    shipNTrack
  </span>
</div>


{/* right side */}
    
           <div className=" rounded-2xl  p-8 w-full  h-100 max-w-md mx-auto">
   

    <div className="text-center lg:text-left " >
       

      <img src="/tagimg.png" alt="Tag" className="w-auto h-38  mx-auto" />

        <h1 className="text-4xl sm:text-5xl font-bold mb-6  ">
         Welcome to shipNTrack {' '}
        

          <span className="bg-gradient-to-r from-orange-600 via-pink-400 to-violet-600 text-transparent bg-clip-text">
            start your shipment tracking instantly.   </span>
        </h1>
      </div>

     
  </div>
  </div>
  </div>
     </div>       



    <div className="max-w-9xl mx-auto pt-28 px-6 sm:px-8 py-16">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
    What’s your order <span className="bg-gradient-to-r from-orange-400 to-purple-500 text-transparent bg-clip-text">status?</span>
  </h2>

  <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-5 gap-12 relative ">
    {steps.map((step, index) => (
      <div key={index} className="flex md:flex-col items-start md:items-center relative px-2">

        {/* Horizontal Connector for Desktop */}
        {index !== steps.length - 1 && (
          <div className="hidden lg:block absolute top-6 right-[-45px] w-[90px] border-t-[3px] border-dotted border-purple-400 z-0"></div>
        )}

        {/* Vertical Connector for Mobile */}
        {index !== steps.length - 1 && (
          <div className="lg:hidden absolute left-5 top-[60px] h-[60px] border-l-[3px] border-dotted border-purple-400 z-0"></div>
        )}

        {/* Icon */}
        <div className="z-10 bg-white p-2 rounded-full shadow-md border border-amber-200">
          <img src={step.icon} alt={step.title} className="w-22 h-22" />
        </div>

        {/* Text */}
        <div className="mt-4 text-left md:text-center px-2">
          <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>


 
               <div
  className=" bg-cover text h-auto bg-fixed  bg-center bg-no-repeat transition duration-300"
  style={{ backgroundImage: "url('/bgimg.png')" }} 
>
     <div className="bg-white/70 backdrop-blur-sm min-h-screen pt-28">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-4 px-6 py-10">
     <h1 className="text-4xl text-center sm:text-5xl font-bold mb-6  ">
         Why to Choose {' '}
        

          <span className="bg-gradient-to-r from-orange-600 via-pink-400 to-violet-600 text-transparent bg-clip-text">
          shipNTrack ?   </span>
        </h1>


{/* right side */}
          <div className=" rounded-2xl  p-8 w-full  h-100 max-w-md mx-auto">
   

    <div className="text-center lg:text-left " >
       

     
        <h1 className="text-3xl  font-bold mb-6  ">
        Speed & {' '}
          <span className="bg-gradient-to-r from-orange-600 via-pink-400 to-violet-600 text-transparent bg-clip-text">
            Reliability  </span>
        </h1>
        <h1 className="text-3xl  font-bold mb-6  ">
        Security &{' '}
          <span className="bg-gradient-to-r from-orange-600 via-pink-400 to-violet-600 text-transparent bg-clip-text">
          Transparency  </span>
            </h1>
             <h1 className="text-3xl  font-bold mb-6  ">
    Real-time{' '}
          <span className="bg-gradient-to-r from-orange-600 via-pink-400 to-violet-600 text-transparent bg-clip-text">
         updates  </span>
            </h1>
             <h1 className="text-3xl  font-bold mb-6  ">
        Track your parcel  {' '}
          <span className="bg-gradient-to-r from-orange-600 via-pink-400 to-violet-600 text-transparent bg-clip-text">
           anywhere, anytime  </span>
        </h1>
        
      </div>
</div>
     



     

  </div>
       
  </div>

     </div>       



  <div className='   h-3/12 '>
  <div className='text-center font-bold  text-3xl mt-12  bg-gradient-to-b from-orange-600 to-pink-400  bg-clip-text text-transparent'>Ship Smarter,</div>
  
<div className='text-center font-bold  text-3xl mt-12  bg-gradient-to-b from-pink-600 to-violet-600  bg-clip-text text-transparent'>Track Faster</div>
  

  </div>
            

  <Footer/>
 
</div>

    
  )
}

export default Home
