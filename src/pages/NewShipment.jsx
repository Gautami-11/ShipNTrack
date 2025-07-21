import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, auth } from "../config/firebase";
import Navbar from "../components/Navbar";

const initialState = {
  senderName: "",
  senderContact: "",
  receiverName: "",
  receiverContact: "",
  packageSize: "Medium",
  deliveryAddress: "",
  pickupDate: "",
  notes: "",
};

const NewShipment = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const trackingId = uuid().slice(0, 8).toUpperCase();

      await addDoc(collection(db, "shipments"), {
        ...form,
        trackingId,
        userId: auth.currentUser.uid,
        status: "Pending",
        statusHistory: [{ status: "Pending", ts: new Date().toISOString() }],
        createdAt: serverTimestamp(),
      });

      alert(`Shipment created!\nTracking ID: ${trackingId}`);
      setForm(initialState);
      
    } catch (err) {
      alert("Error creating shipment: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
     <Navbar/>
      <h1>Create New Shipment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Sender Name</label>
          <input name="senderName" value={form.senderName} onChange={handleChange} required />
        </div>

        <div>
          <label>Sender Contact</label>
          <input name="senderContact" value={form.senderContact} onChange={handleChange} required />
        </div>

        <div>
          <label>Receiver Name</label>
          <input name="receiverName" value={form.receiverName} onChange={handleChange} required />
        </div>

        <div>
          <label>Receiver Contact</label>
          <input name="receiverContact" value={form.receiverContact} onChange={handleChange} required />
        </div>

        <div>
          <label>Package Size</label>
          <select name="packageSize" value={form.packageSize} onChange={handleChange}>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>

        <div>
          <label>Delivery Address</label>
          <textarea name="deliveryAddress" value={form.deliveryAddress} onChange={handleChange} required />
        </div>

        <div>
          <label>Pickup Date</label>
          <input type="date" name="pickupDate" value={form.pickupDate} onChange={handleChange} />
        </div>

        <div>
          <label>Special Instructions</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Shipment"}
        </button>
      </form>
    </div>
  );
};

export default NewShipment;
