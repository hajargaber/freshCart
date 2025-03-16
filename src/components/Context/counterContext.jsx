import { useState } from "react";
import { createContext } from "react";



export let counterContext= createContext()

export default function CounterContextprovider(props){

 let [count,setCount]=useState(10)

 return <counterContext.Provider value={{count,setCount}}>
  {props.children}
 </counterContext.Provider>
}