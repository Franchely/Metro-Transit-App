import React from 'react'

export default function DeparturesTable(props) {

    if (!props.departures)
    return (
      <div >
        <p className='no-departures'>No upcoming departures found.</p>
      </div>
    );

  return (
    <div className='route-info-table-container'>
        <table className='route-info-table' data-testid='route-info-table'>
            <thead className='route-info-table-header'>
                <tr>
                    <th>
                        ROUTE
                    </th>
                    <th>
                        DESTINATION
                    </th>
                    <th>
                        DEPARTS
                    </th>
                </tr>
            </thead>
            
                {
                    props.departures.length > 0 ? 

                    props.departures.map((departure, index) => {
                        return <tbody className='route-info-table-body'>
                                <tr className='departure' key={index} data-testid='departure'>
                                    <td className='departure-route'>
                                        {departure.Terminal ? 
                                        `${departure.Route}${departure.Terminal}` 
                                         : 
                                         departure.Route}
                                    </td>
                                    <td className='departure-name'>
                                        {departure.Description}
                                    </td>
                                    <td className='departure-time'>
                                        {departure.DepartureText}
                                        
                                    </td>
                               </tr>
                        </tbody>
                    })

                    :
                    <tbody className='no-departures'>
                        <tr className='no-departures'>No upcoming departures found.</tr>
                    </tbody>
                }
        </table>
    </div>
  )
}
