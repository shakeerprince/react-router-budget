import React from 'react'
import { fetchData } from '../helpers';
import { useLoaderData } from 'react-router-dom';
import Intro from "../components/Intro"

//loader
export function dashboardLoader(){
    const userName = fetchData("userName");
    return { userName}
}

//action
export async function dashboardAction({request}){
    const data = await request.formData();
    const formData = Object.formEntries(data)
   try{
    localStorage.setItem("userName", JSON.stringify(formData.userName))
    return toast.success(`Welcome, ${formData.userName}`)
   } catch(e){
    throw new Error("There war a problem creating your account.") 
   }
    
}



const Dashboard = ()=> {
    const { userName } = useLoaderData()

  return (
    <>
         {userName ? ( <p>{userName}</p>):
         <Intro />}
        
    </>
  ) 
}

export default Dashboard