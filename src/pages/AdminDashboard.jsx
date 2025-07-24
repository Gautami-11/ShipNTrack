import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const AdminDashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  const handleEdit = async (id) => {
    const newStatus = prompt("Enter new status (e.g., Dispatched, Delivered):");
    if (newStatus) {
      try {
        const shipmentRef = doc(db, "shipments", id);
        await updateDoc(shipmentRef, { status: newStatus });
        alert("Shipment updated");
      } catch (error) {
        console.error("Error updating shipment:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this shipment?")) {
      try {
        await deleteDoc(doc(db, "shipments", id));
        setShipments((prev) => prev.filter((s) => s.id !== id)); // Optional: local update
        alert("Shipment deleted");
      } catch (error) {
        console.error("Error deleting shipment:", error);
      }
    }
  };

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "shipments"));
        const shipmentData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setShipments(shipmentData);
      } catch (err) {
        console.error("Error fetching shipments:", err);
        setError(err.message);
      }

      console.log("Fetching shipments from Firestore...");
    };

    fetchShipments();
  }, []);

  if (error) return <div className="text-red-500"> {error}</div>;



const filterShipments = shipments.filter((shipment) => {
  const sender = shipment.senderName?.toLowerCase() || "";
  const receiver = shipment.receiverName?.toLowerCase() || "";
  const status = shipment.status?.toLowerCase() || "";
  return (
    sender.includes(searchTerm) ||
    receiver.includes(searchTerm) ||
    status.includes(searchTerm)
  );
});


  return (
    <div className="pt-28 bg-blue-50 p-10 text h-screen overflow-y-scroll custom-scrollbar-hide"  
  >
        <Navbar/>
      <h2 className="text-3xl text-center font-bold m-4">Admin Dashboard</h2>
   <div className="flex"><h2 className="text-teal-500 font-bold text-lg">   Filter by </h2>
 <input
  type="text"
  placeholder="Search by sender, receiver, or status..."
  className="mb-6 ml-8 w-90 p-2 border border-blue-700 rounded-xl"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
/></div>


      {filterShipments.length === 0 ? (
        <p>No shipments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filterShipments.map((shipment) => (
            <div
              key={shipment.id}
              className=" p-4 rounded-2xl border border-sky-500 bg-white shadow-2xl "
            >
              <p>
                <strong>Sender:</strong> {shipment.senderName || "N/A"}
              </p>
              <p>
                <strong>Receiver:</strong> {shipment.receiverName || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {shipment.status || "N/A"}
              </p>
              <p>
                <strong>Package Size:</strong> {shipment.packageSize || "N/A"}
              </p>

              <p>
                <strong>Address:</strong> {shipment.deliveryAddress || "N/A"}
              </p>

                <p> <strong>Created At Time : {shipment.createdAt?.toDate().toLocaleString() || "N/A"}</strong></p>
         

              <button className="bg-red-500 hover:bg-red-600 p-2 rounded-lg text-black font-semibold  m-6" onClick={() => handleEdit(shipment.id)}>Edit</button>
              <button className="bg-green-500  hover:bg-green-600 p-2 rounded-lg text-black font-semibold  m-6" onClick={() => handleDelete(shipment.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
