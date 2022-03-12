import React, { useState, useEffect } from "react";
import Axios from "axios"
import Form from "../components/Form";

const Home=()=> {

    const [getRoutes, setGetRoutes] = useState(null)

    // Get list of routes
    useEffect(() => {
        Axios.get("https://svc.metrotransit.org/NexTrip/Routes?format=json").then(
          (response) => {
            const routes = response.data;
            setGetRoutes(routes);
          }
        ).catch(error => {
          window.alert("An error occurred. Please refresh the page.")
        });
      }, [])

    return (
        <div>
            {
                getRoutes === null ? 
                null 
                :
                <Form routeOptions={getRoutes}/>
            }
        </div>
    )
}

export default Home