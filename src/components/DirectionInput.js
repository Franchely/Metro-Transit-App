import React, { useState, useEffect} from 'react'
import Axios from 'axios'
import StopsInput from './StopsInput'


export default function DirectionInput(props) {

    const [directionOptions, setDirectionOptions] = useState(null)
    const [selectedDirection, setSelectedDirection] = useState(null)
    const [showStops, setShowStops] = useState(false)
 

    // Get list of directions
    useEffect(() => {
        Axios.get(`https://svc.metrotransit.org/NexTrip/Directions/${props.selectedRoute}?format=json`).then(
          (response) => {
            const directions = response.data;
            setDirectionOptions(directions);
          }
        ).catch(error => {
            window.alert("An error occurred. Please refresh the page.")
            console.log(error)
          });
    }, [props.selectedRoute])

    const handleDirectionSelect = (event) => {
        var direction = document.getElementsByName(event.target.value)
        setSelectedDirection(direction[0].id)
        setShowStops(true)
    }

    if (!directionOptions)
        return (
          <div>
            <p>Loading...</p>
          </div>
        );

  return (
      <div>
        <select
            className='input'
            id='select-direction'
            onChange={e => handleDirectionSelect(e)}
        >     
            <option disabled selected>
                Select Direction...
            </option>

            {directionOptions.map((option) => {
                return <option value={option.Text} name={option.Text} id={option.Value} key={option.Value}>{option.Text}</option>;
            })}
        </select> 

        {showStops === true ? 

            <StopsInput 
                selectedDirection={selectedDirection} 
                selectedRoute={props.selectedRoute}/>
                :
            null
        }

      </div>

  )
}

