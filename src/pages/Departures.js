import React, { useState, useEffect} from 'react'
import DeparturesTable from '../components/DeparturesTable'
import {useLocation} from "react-router-dom";

export default function Departures(props) {

  // console.log("departures prop 1:", props.departures)
  // console.log(props.selectedStop)
  console.log(useLocation())

  return (
    <div>
      {/* <DeparturesTable selectedStop={props.selectedStop} departures={props.departures} /> */}
    </div>
  )
}
