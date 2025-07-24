import React, { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Navbar from "../components/Navbar";



const TrackShipment = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "shipments"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setShipments(data);
    });

    return () => unsubscribe();
  }, []);

  return (
  
    <div
  className="pt-32  min-h-screen overflow-y-scroll custom-scrollbar-hide bg-blue-50"
  
>
     
    
     
      <Navbar/>
        <div className="text-center text-3xl font-semibold">My Shipments</div>
     <div  > {shipments.length === 0 ? (
        <p className="text-3xl p-7 m-9 ">No shipments found.</p>
      ) : (
        <ul className="w-auto grid lg:grid-cols-2 items-center">
          {shipments.map((shipment) => (
            <li 
            className="bg-white m-9 p-8 shadow-xl rounded-4xl min-w-[280px] max-w-xl hover:shadow-blue-200 "
              key={shipment.id}
              
                >
              <p><strong>Tracking ID:</strong> {shipment.trackingId}</p>
              <p><strong>Status:</strong> {shipment.status}</p>
              <p><strong>To:</strong> {shipment.receiverName}</p>
              <p><strong>Pickup Date:</strong> {shipment.pickupDate}</p>
              <p><strong>Package Size:</strong> {shipment.packageSize}</p>
           
            </li>
          ))}
        </ul>
      )}</div>
      
     
    </div>
  );
};

export default TrackShipment;
