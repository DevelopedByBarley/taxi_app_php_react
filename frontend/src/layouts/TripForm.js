import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/TripForm.css";


export function TripForm({ carId, setTrips, isFormActive, setFormActive }) {
  const sendTrip = (event) => {
    event.preventDefault();

    const newTrip = {
      numberOfMinutes: event.target.elements.numberOfMinutes.value,
      hourlyRate: event.target.elements.hourlyRate.value,
      date: new Date(event.target.elements.date.value).getTime()
    }

    event.target.elements.numberOfMinutes.value = ""
    event.target.elements.hourlyRate.value = ""
    event.target.elements.date.value = ""



    axios.post(`http://localhost:9090/backend/server/server.php/add-trip?carId=${carId}`, newTrip)
      .then(res => setTrips((current) => [...current, res.data]))
      .catch(error => console.log(error));

  }



  return (
    <div className={`trip-form bg-primary text-light p-5 ${isFormActive ? "active" : ""}`} >
      <button className='btn btn-light' onClick={() => setFormActive(false)}>x</button>
      <h3 className='mt-5'>Add Trip</h3>
      <Form onSubmit={sendTrip}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='mt-5'>Minutes</Form.Label>
          <Form.Control type="number" placeholder="Enter number of minutes" name="numberOfMinutes" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Hourly Rate</Form.Label>
          <Form.Control type="number" placeholder="Hourly rate" name="hourlyRate" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Control type="date" label="date" name="date" />
        </Form.Group>
        <Button onClick={() => setFormActive(false)} variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
