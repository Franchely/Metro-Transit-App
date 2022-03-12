import React, { useState, useEffect} from 'react'
import DeparturesTable from '../components/DeparturesTable'
import {useLocation, useParams, useNavigate} from "react-router-dom";
import Axios from 'axios'

export default function Departures(props) {

  const navigate = useNavigate()
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
          window.alert("An error occurred. You will be redirected to the home page.")
          navigate("/")
        });
}, [])

  if (!departures)
  return (
    <div>
      <p className='loading-select'>Loading...</p>
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
