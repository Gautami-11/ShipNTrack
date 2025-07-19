import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect ,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth ,db} from '../config/firebase';
import { onSnapshot ,collection,query,where  } from 'firebase/firestore';


const TrackShipment = () => {
  const [shipments, setShipments] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
  const q = query(collection(db, "shipments"), where("userId", "==", auth.currentUser.uid));
  const unsub = onSnapshot(q, (snap) => {
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setShipments(data);
  });
  return () => unsub();
}, []);

  return (
    <div >
      <Navbar/>

      <h2>My Shipments</h2>
      {shipments.map((shipment) => (
        <div
          key={shipment.id}
          onClick={() => navigate(`/shipment/${shipment.id}`)}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
            cursor: 'pointer'
          }}
        >
          <h3>Tracking ID: {shipment.trackingId}</h3>
          <p>Status: {shipment.status}</p>
          <p>Receiver: {shipment.receiverName}</p>
        </div>
      ))}
 

    </div>
  )
}

export default TrackShipment
