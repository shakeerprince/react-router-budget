import React from "react";
import { fetchData, createBudget, wait, createExpense, deleteItem } from "../helpers";
import { Link, useLoaderData } from "react-router-dom";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm" 
import BudgetItem from "../components/BudgetItem";
import  Table  from "../components/Table";
//loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

//action
export async function dashboardAction({ request }) {
  await wait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  //new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }
  if (_action === "createExpense") {
    try {
      // Create expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget
      })
      return toast.success(`Expense ${values.newExpense} created`);
    } catch (e) {
      throw new Error("There was a problem creating your Expense.");
    }
  }
  if (_action === "deleteExpense") {
    try {
      // Create expense
      deleteItem({
       key: "expenses",
       id: values.expenseId
      })
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your Expense.");
    }
  }
}

// const formData = Object.fromEntries(data)
//    try{
//     localStorage.setItem("userName", JSON.stringify(formData.userName))
//     return toast.success(`Welcome, ${formData.userName}`)
//    } catch(e){
//     throw new Error("There war a problem creating your account.")
//    }

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
          {
            budgets && budgets.length > 0
            ? (
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
                <AddExpenseForm budgets={budgets} />
              </div>
              <h2>Existing budgets</h2>
              <div className="budgets">
                {budgets.map((budget) => (
                  <BudgetItem key={budget.id} budget={budget} />
                ))}
              </div>
                {
                  expenses && expenses.length > 0 && (
                    <div className="grid-md">
                      <h2>Recent Expenses</h2>
                      <Table
                        expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)
                          .slice(0, 8)
                          }/>
                            {expenses.length > 8 && (
                              <Link
                              to="expenses"
                              className="btn btn--dark"
                              >
                               View all expenses
                              </Link>
                            )}
                      
                    </div>
                  )
                }
          
            </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started</p>
                <AddBudgetForm />
              </div>
            )
          }   
          </div>
        </div>
      ) : 
        <Intro />
      }
    </>
  );
};

export default Dashboard;
