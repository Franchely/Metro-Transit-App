import React, { useState, useEffect} from 'react'
import DirectionInput from './DirectionInput'
import Axios from "axios"

export default function Form() {

    const [routeOptions, setRouteOptions] = useState(null)
    const [selectedRoute, setSelectedRoute] = useState(null)
    const [showDirections, setShowDirections] = useState(false)

    // Get list of routes
    useEffect(() => {
        Axios.get("https://svc.metrotransit.org/NexTrip/Routes?format=json").then(
          (response) => {
            const routes = response.data;
            setRouteOptions(routes);
          }
        ).catch(error => {
          window.alert("An error occurred. Please refresh the page.")
          console.log(error)
        });
      }, [])


    const handleRouteSelect = (event) => {
        var route = document.getElementsByName(event.target.value)

        setSelectedRoute(route[0].id)
        setShowDirections(true)

    }

    
    if (!routeOptions)
        return (
          <div>
            <p>Loading...</p>
          </div>
        );

  return (
    <div className="form-container">
        <span className='form-span'>
        <h2 className="form-title">Search By Route</h2>
        <select
            className='input'
            id='select-route'
            onChange={e => handleRouteSelect(e)}
        >
            <option disabled selected>
                Select Route...
            </option>
            
            {routeOptions.map((option) => {
                return <option value={option.Description} name={option.Description} id={option.Route} key={option.Route}>{option.Description}</option>;
            })}
        </select>

        {showDirections === true ? 

            <DirectionInput selectedRoute={selectedRoute}/>
            :
            null
        }
        </span>

    </div>
  )
}
