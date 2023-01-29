import { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import '../styles/Cars.css';
import { CarForm } from './CarForm';

export function Cars({ setTrips, setCarId }) {
  const [cars, setCars] = useState([]);
  const [currentindex, setCurrentIndex] = useState();
  const [isFormActive, setFormActive] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:9090/backend/server/server.php/cars")
      .then((res) => {
        setCars(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  console.log(cars);

  const getTrips = (event, carId) => {
    event.preventDefault();
    axios.get(`http://localhost:9090/backend/server/server.php/trips?carId=${carId}`)
      .then(res => setTrips(res.data))
      .catch(error => console.log(error));
  }


  return (
    <div className="cars-container border m-1">
      <div class="jumbotron jumbotron-fluid bg-dark text-light">
        <div class="container">
          <h1 class="display-4 text-center p-5 ">Cars</h1>
        </div>
      </div>
      <ListGroup as="ul">
        {cars.map((car, index) => {
          return (
            <ListGroup.Item key={index} className={currentindex === index ? "car-item active" : "car-item"} as="li" onClick={(event) => {
              getTrips(event, car.id);
              setCurrentIndex(index)
              setCarId(car.id)
            }}>
              <span>Car name: <h1>{car.name}</h1></span>
              <span>License Number: <h6>{car.licenseNumber}</h6></span>
              <span>Hourly Rate: <h6>{car.hourlyRate}</h6></span>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
      <button onClick={() => { setFormActive(!isFormActive) }} className='btn btn-success'>Add Car</button>
      <CarForm isFormActive={isFormActive} setFormActive={setFormActive} setCars={setCars} />
    </div>
  )
}
