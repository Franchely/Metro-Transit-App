import React, { useState, useEffect} from 'react'
import DirectionInput from './DirectionInput'
import Axios from "axios"


export default function Form(props) {

    const [routeOptions, setRouteOptions] = useState(null)
    const [selectedRoute, setSelectedRoute] = useState(null)
    const [directionOptions, setDirectionOptions] = useState(null)

    // Set route options on page load
    useEffect(() => {
        setRouteOptions(props.routeOptions)
    }, [])

     // Get list of directions once route is selected
    useEffect(() => {
        if (!!selectedRoute === true) {
            Axios.get(`https://svc.metrotransit.org/NexTrip/Directions/${selectedRoute}?format=json`).then(
              (response) => {
                const directions = response.data;
                setDirectionOptions(directions);
              }
            ).catch(error => {
                window.alert("An error occurred. Please refresh the page.")
              });
        } 
    }, [selectedRoute])


    const handleRouteSelect = (event) => {
        var route = document.getElementsByName(event.target.value)
        setSelectedRoute(route[0].id)
    }

    
    if (!routeOptions)
        return (
          <div>
            <p className='loading'>Loading...</p>
          </div>
        );

  return (
    <div className="form-container">
        <span className='form-span'>
        <h2 className="form-title">Search By Route</h2>
        <select
            className='input'
            id='select-route'
            role="select"
            onChange={e => handleRouteSelect(e)}
            data-testid="select-route"
            defaultValue='Select Route...'
        >
            <option disabled role="option">
                Select Route...
            </option>
            
            {routeOptions.map((option) => {
                return <option 
                            value={option.Description} 
                            name={option.Description} 
                            id={option.Route} 
                            key={option.Route}
                            role="option"
                            data-testid="select-option" > 
                            {option.Description} 
                        </option>;
            })}
        </select>

        {!!directionOptions ? 

            <DirectionInput selectedRoute={selectedRoute} directionOptions={directionOptions}/>
            :
            null
        }
        </span>

    </div>
  )
}
