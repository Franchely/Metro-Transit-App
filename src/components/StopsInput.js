import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

export default function StopsInput(props) {

    const [stopOptions, setStopOptions] = useState(null)
    const [selectedStop, setSelectedStop] = useState(null)
    const [allSelected, setAllSelected] = useState(false)
    const [departures, setDepartures] = useState(null)

    // Get list of stops
    useEffect(() => {
        Axios.get(`https://svc.metrotransit.org/NexTrip/Stops/${props.selectedRoute}/${props.selectedDirection}?format=json`).then(
          (response) => {
            const stops = response.data;
            setStopOptions(stops);
          }
        );
    }, [props.selectedDirection])

    // Get departures for selected stop
    useEffect(() => {
        if (allSelected === true) {
            Axios.get(`https://svc.metrotransit.org/NexTrip/${props.selectedRoute}/${props.selectedDirection}/${selectedStop}?format=json`).then(
              (response) => {
                const data = response.data;
                console.log("departures array:", data)
                setDepartures(data);
              }
            );
        }
    }, [allSelected])

    const handleStopSelect = (event) => {
        var stop = document.getElementsByName(event.target.value)
        setSelectedStop(stop[0].id)
        setAllSelected(true)
    }

    if (!stopOptions)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return (
    <div>
        
        <select
            className='input'
            id='select-stop'
            onChange={e => handleStopSelect(e)}
        >     

            <option disabled selected>
                Select Stop...
            </option>

            {stopOptions.map((option) => {
                return <option value={option.Text} name={option.Text} id={option.Value} key={option.Value}>{option.Text}</option>;
            })}
        </select> 

        {departures != null ? 
        
        // console.log("usestate departures:", departures)

        <Link to={{
            pathname: "/departures",
            state: {departures}
        }} 
            className='submit-button'
        >
            Submit
        </Link>
        : 

        null

        }

        
    </div>
  )
}
