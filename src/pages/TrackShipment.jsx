import React, { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import { collection, query, where, onSnapshot ,deleteDoc ,doc } from "firebase/firestore";
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


   const handleDelete = async (id) => {
      if (confirm("Are you sure you want to delete this shipment?")) {
        try {
          await deleteDoc(doc(db, "shipments", id));
          setShipments((prev) => prev.filter((s) => s.id !== id)); 
          alert("Shipment deleted");
        } catch (error) {
          console.error("Error deleting shipment:", error);
        }
      }
    };

  return (
  
   <div
  className="pt-32 bg-sky-100 min-h-screen overflow-y-scroll custom-scrollbar-hide"
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
           <p> Created At Time  {shipment.createdAt?.toDate().toLocaleString() || "N/A"}</p>

            <button className="bg-red-500 hover:bg-red-600 p-2 rounded-lg text-black font-semibold  m-6" onClick={() => handleDelete(shipment.id)}>Cancel Your Shipment</button>
            
            </li>
          ))}
        </ul>
      )}

      
      </div>
      
       
   
    </div>
  
  );
};

export default TrackShipment;
