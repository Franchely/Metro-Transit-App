import React, { useState, useEffect} from 'react'
import Axios from 'axios'
import StopsInput from './StopsInput'


export default function DirectionInput(props) {

    const [selectedDirection, setSelectedDirection] = useState(null)
    const [stopOptions, setStopOptions] = useState(null)

     // Get list of stops once direction is chosen
     useEffect(() => {
         if(!!selectedDirection) {
             Axios.get(`https://svc.metrotransit.org/NexTrip/Stops/${props.selectedRoute}/${selectedDirection}?format=json`).then(
               (response) => {
                 const stops = response.data;
                 setStopOptions(stops);
               }
             ).catch(error => {
                 window.alert("An error occurred. Please refresh the page.")
               });
         }
    }, [selectedDirection])

    const handleDirectionSelect = (event) => {
        var direction = document.getElementsByName(event.target.value)
        setSelectedDirection(direction[0].id)
    }

    if (!props.directionOptions)
        return (
          <div>
            <p className='loading-select'>Loading...</p>
          </div>
        );

  return (
      <div>
        <select
            className='input'
            id='select-direction'
            data-testid='select-direction'
            onChange={e => handleDirectionSelect(e)}
        >     
            <option disabled selected>
                Select Direction...
            </option>

            {props.directionOptions.map((option) => {
                return <option 
                            value={option.Text} 
                            name={option.Text} 
                            id={option.Value} 
                            key={option.Value}>
                                {option.Text}
                        </option>;
            })}
        </select> 

        {!!stopOptions ? 

            <StopsInput 
                selectedDirection={selectedDirection} 
                stopOptions={stopOptions}
                selectedRoute={props.selectedRoute}/>
                :
            null
        }

      </div>

  )
}

