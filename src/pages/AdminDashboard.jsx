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

  return (
    <div className="pt-24">
        <Navbar/>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {shipments.length === 0 ? (
        <p>No shipments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shipments.map((shipment) => (
            <div
              key={shipment.id}
              className="border p-4 rounded shadow hover:bg-gray-100"
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

              <button onClick={() => handleEdit(shipment.id)}>Edit</button>
              <button onClick={() => handleDelete(shipment.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
