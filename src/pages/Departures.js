import React, { useState, useEffect} from 'react'
import DeparturesTable from '../components/DeparturesTable'
import {useLocation, useParams} from "react-router-dom";
import Axios from 'axios'

export default function Departures(props) {

  const [departures, setDepartures] = useState(null)

  const params = useParams()
  const location = useLocation()

  useEffect(() => {
        Axios.get(`https://svc.metrotransit.org/NexTrip/${params.route}/${params.direction}/${params.stop}?format=json`).then(
          (response) => {
            const data = response.data;
            setDepartures(data);
          }
        ).catch(error => {
          window.alert("An error occurred. Please return to the home page.")
          console.log(error)
        });
}, [])

  if (!departures)
  return (
    <div>
      <p>Loading...</p>
    </div>
  );


  return (
    <div>
      <span className='stop-name'>
        {location.state.stopName}
      </span>
        <DeparturesTable selectedStop={params.stop} departures={departures} />
    </div>
  )
}
