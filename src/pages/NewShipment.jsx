import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, auth } from "../config/firebase";
import Navbar from "../components/Navbar";
import { Package, Truck, User, Phone, MapPin, Calendar, FileText } from 'lucide-react';
import Footer from "../components/Footer";

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
   <div
  className="pt-32 bg-sky-100 min-h-screen overflow-y-scroll custom-scrollbar-hide"
>
  
  <Navbar/>
     
      <div className="m-9">
      <h1 className="text-center font-semibold m-4 text-4xl   ">Create New Shipment</h1>
      {/* <form className="bg-white p-5 m-8 rounded-3xl shadow-2xl  " onSubmit={handleSubmit}>
        <div>
          <label>Sender Name</label>
          <input className="border border-blue-400" name="senderName" value={form.senderName} onChange={handleChange} required />
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
      </form> */}

      <form className="bg-white m-5 p-2 rounded-2xl shadow-2xl border border-gray-100 max-w-3xl mx-auto" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Sender Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Sender Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="senderName" className="block text-sm font-medium text-gray-700">
                    Sender Name
                  </label>
                  <input
                    id="senderName"
                    name="senderName"
                    type="text"
                    value={form.senderName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter sender's full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="senderContact" className="block text-sm font-medium text-gray-700">
                    Sender Contact
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="senderContact"
                      name="senderContact"
                      type="tel"
                      value={form.senderContact}
                      onChange={handleChange}
                      required
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Receiver Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                Receiver Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="receiverName" className="block text-sm font-medium text-gray-700">
                    Receiver Name
                  </label>
                  <input
                    id="receiverName"
                    name="receiverName"
                    type="text"
                    value={form.receiverName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter receiver's full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="receiverContact" className="block text-sm font-medium text-gray-700">
                    Receiver Contact
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="receiverContact"
                      name="receiverContact"
                      type="tel"
                      value={form.receiverContact}
                      onChange={handleChange}
                      required
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-600" />
                Package Details
              </h3>
              
              <div className="space-y-2">
                <label htmlFor="packageSize" className="block text-sm font-medium text-gray-700">
                  Package Size
                </label>
                <select
                  id="packageSize"
                  name="packageSize"
                  value={form.packageSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                >
                  <option value="Small">Small (up to 5kg)</option>
                  <option value="Medium">Medium (5-15kg)</option>
                  <option value="Large">Large (15kg+)</option>
                </select>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                Delivery Information
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>
                  <textarea
                    id="deliveryAddress"
                    name="deliveryAddress"
                    value={form.deliveryAddress}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                    placeholder="Enter complete delivery address including city and postal code"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">
                    Pickup Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="pickupDate"
                      name="pickupDate"
                      type="date"
                      value={form.pickupDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" />
                Additional Information
              </h3>
              
              <div className="space-y-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Special Instructions
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  placeholder="Any special handling instructions or notes (optional)"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Shipment...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Truck className="w-5 h-5" />
                    Create Shipment
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
    
  );
};

export default NewShipment;
