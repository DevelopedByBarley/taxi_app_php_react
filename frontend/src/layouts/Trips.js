import { ListGroup } from "react-bootstrap"
import { TripForm } from "./TripForm"
import "../styles/Trips.css"
import { useEffect, useState } from "react"

export function Trips({ trips, carId, setTrips }) {

  const [isFormActive, setFormActive] = useState(false)



  return (
    <div className="trips-container border m-1">
      <div class="jumbotron jumbotron-fluid bg-dark text-light ">
        <div class="container">
          <h1 class="display-4 text-center p-5">Trips</h1>
        </div>
      </div>
      <div className="trips">
        {trips.length !== 0 ? (
          <>
            <ListGroup as="ul">
              {trips.map((trip) => {
                return (

                  <ListGroup.Item className='car-item' as="li">
                    <span>Minutes: <h1>{trip.numberOfMinutes}</h1></span>
                    <span>Date: <h6>{new Date(trip.date).toDateString()}</h6></span>
                    <span>Hourly Rate: <h6>{trip.hourlyRate}</h6></span>
                  </ListGroup.Item>

                )
              })}
            </ListGroup>
          </>
        ) : (
          <h1 className="text-center">There is no trips  of that car!</h1>
        )}
        {<TripForm carId={carId} setTrips={setTrips} isFormActive={isFormActive} setFormActive={setFormActive} />}
        <button className="btn btn-success text-light" onClick={() => setFormActive(!isFormActive)}>Add Trip</button>
      </div>
    </div >
  )
}
