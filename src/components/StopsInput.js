import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function StopsInput(props) {

    const [stopOptions, setStopOptions] = useState(null)
    const [selectedStop, setSelectedStop] = useState(null)

    // Get list of stops
    useEffect(() => {
        Axios.get(`https://svc.metrotransit.org/NexTrip/Stops/${props.selectedRoute}/${props.selectedDirection}?format=json`).then(
          (response) => {
            const stops = response.data;
            console.log(stops)
            setStopOptions(stops);
          }
        );
    }, [props.selectedDirection])

    const handleStopSelect = (event) => {
        var stop = document.getElementsByName(event.target.value)
        setSelectedStop(stop[0].id)
        console.log(stop[0].id)
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
        
    </div>
  )
}
