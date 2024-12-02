import React from 'react'
import { fetchData } from '../helpers';
import { useLoaderData } from 'react-router-dom';
import Intro from "../components/Intro"
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";

//loader
export function dashboardLoader(){
    const userName = fetchData("userName");
    const budgets = fetchData("userName");
    return { userName, budgets}
}

//action
export async function dashboardAction({request}){
    const data = await request.formData();
    const formData = Object.fromEntries(data)
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
         {userName ? ( 
          <div className="dashboard">
            <h1>Welcome back, <span className='accent'>
              {userName}</span> </h1>
              <div className="grid-sm">
              {/* budgets ? () : () */}
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                </div>
              </div>
              </div>
          </div>
         ):
         <Intro />}
        
    </>
  ) 
}

export default Dashboard