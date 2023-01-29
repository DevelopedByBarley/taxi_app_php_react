
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import { Cars } from './layouts/Cars';
import { Trips } from './layouts/Trips';

function App() {

  const [trips, setTrips] = useState([]);
  const [carId, setCarId] =  useState(0)

  return (
    <div className="app-container">
      <Cars setTrips={setTrips} setCarId={setCarId}/>
      <Trips trips={trips} carId={carId} setTrips={setTrips}/>
    </div>
  );
}

export default App;
