export const wait = ()=> new Promise(res =>
    setTimeout(res, Math.random() * 800))
 



const generateRandomColor = () =>{
    const existingBudgetLength = fetchData("budgets")?.
    length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}



//Local storage

import { LockClosedIcon } from "@heroicons/react/24/solid"

//local storage
export const fetchData = (key) =>{
    return JSON.parse(localStorage.getItem(key))
}

//create budget
export const createBudget = ({
    name, amount
}) =>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()

    }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", 
        JSON.stringify([...existingBudgets, newItem])
    )
}

export const createExpense = ({
    name, amount, budgetId
}) =>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,
        budgetId: budgetId

    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", 
        JSON.stringify([...existingExpenses, newItem])
    )
}

//delete item
export const deleteItem = ({ key})=>{
    return localStorage.removeItem(key)
}


//total spent by budget
export const calculateSpentByBudget = (budgetId)=>{
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense)=> {
        if(expense.budgetId !== budgetId ) return acc 
        
        return acc += expense.amount

    }, 0)
    return budgetSpent;
}

//Formatting
export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

//Formatting percentages
export const formatPercentage = (amt)=>{
    return amt.toLocaleString(undefined, {
        style: 'percent',
        minimumFractionDigits: 0,
    })
}



//format currency

export const formatCurrency = (amt)=>{
    return amt.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD'
    })
}