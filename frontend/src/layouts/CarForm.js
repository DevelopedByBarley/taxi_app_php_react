
import axios from "axios";
import { Form, Button } from "react-bootstrap"
import "../styles/CarForm.css"


export function CarForm({ setCars, setFormActive, isFormActive }) {

  const sendCar = (event) => {
    event.preventDefault();

    const newCar = {
      name: event.target.elements.name.value,
      licenceNumber: event.target.elements.licenceNumber.value,
      hourlyRate: event.target.elements.hourlyRate.value,
    }


    axios.post("http://localhost:9090/backend/server/server.php/add-car", newCar)
      .then(res => setCars(res.data))
      .catch(error => console.log(error))


    event.target.elements.name.value = ""
    event.target.elements.licenceNumber.value = ""
    event.target.elements.hourlyRate.value = ""
  }


  return (
    <div className={`car-form bg-success text-light p-5 ${isFormActive ? "active" : ""}`} >
      <button className='btn btn-light' onClick={() => setFormActive(false)}>x</button>
      <h3 className='mt-5'>Add Car</h3>
      <Form onSubmit={sendCar}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='mt-5'>Car Name</Form.Label>
          <Form.Control type="text" placeholder="Car name" name="name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Licence Number</Form.Label>
          <Form.Control type="text" placeholder="Licence Number" name="licenceNumber" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Hourly Rate</Form.Label>
          <Form.Control type="number" label="Hourly Rate" placeholder="Hourly Rate" name="hourlyRate" />
        </Form.Group>
        <Button onClick={() => setFormActive(false)} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}


