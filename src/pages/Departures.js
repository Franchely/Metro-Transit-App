import React, { useState, useEffect} from 'react'
import DeparturesTable from '../components/DeparturesTable'
import {useLocation, useParams} from "react-router-dom";
import Axios from 'axios'

export default function Departures(props) {

  const [departures, setDepartures] = useState(null)

  let params = useParams()

  useEffect(() => {
        Axios.get(`https://svc.metrotransit.org/NexTrip/${params.route}/${params.direction}/${params.stop}?format=json`).then(
          (response) => {
            const data = response.data;
            console.log("departures array:", data)
            setDepartures(data);
          }
        );
}, [])

  if (!departures)
  return (
    <div>
      <p>Loading...</p>
    </div>
  );


  return (
    <div>
        <DeparturesTable selectedStop={params.stop} departures={departures} />
    </div>
  )
}
