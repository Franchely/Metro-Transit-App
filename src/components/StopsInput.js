import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function StopsInput(props) {

    const [selectedStop, setSelectedStop] = useState(null)
    const [stopName, setStopName] = useState(null)
    const [allSelected, setAllSelected] = useState(false)

    const handleStopSelect = (event) => {
        var stop = document.getElementsByName(event.target.value)
        setSelectedStop(stop[0].id)
        setStopName(stop[0].value)
        setAllSelected(true)
    }

    if (!props.stopOptions)
    return (
      <div>
        <p className='loading-select'>Loading...</p>
      </div>
    );

  return (
    <div className='stops-and-button'>
        
        <select
            className='input'
            id='select-stop'
            data-testid='select-stop'
            role='select'
            onChange={e => handleStopSelect(e)}
            defaultValue='Select Stop...'
        >     

            <option disabled>
                Select Stop...
            </option>

            {props.stopOptions.map((option) => {
                return <option 
                            value={option.Text} 
                            name={option.Text} 
                            id={option.Value} 
                            key={option.Value}>
                                {option.Text}
                        </option>;
            })}
        </select> 

        {allSelected && !!stopName ?  
             <Link to={{
                pathname: `/departures/${props.selectedRoute}/${props.selectedDirection}/${selectedStop}`
             }}
                state={{stopName: stopName}} 
                className='submit-button'
                data-testid='submit-button'
            >
                Submit
            </Link>
        : 
        null}

        
    </div>
  )
}
