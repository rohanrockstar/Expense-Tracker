import React, { useState } from 'react';
import { Typography } from '@mui/material';
import AddExpenseForm from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import Chart from './components/Chart';

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      background: "linear-gradient(#e66465, #9198e5)", // Gradient background
    }}>
      <Typography variant="h4" align="center" gutterBottom  color="primary" fontWeight="600"  fontFamily=" 'sans-serif',">
        Expense Tracker
      </Typography>
      <AddExpenseForm onAddExpense={addExpenseHandler} />
      <Chart expenses={expenses} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;
