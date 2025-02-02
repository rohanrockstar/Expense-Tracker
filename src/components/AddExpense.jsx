import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Paper, Typography, InputAdornment, Box } from '@mui/material';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expenseData, setExpenseData] = useState({
    date: '',
    amount: '',
    reason: '',
    category: '',
  });

  const handleInputChange = (e) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(expenseData);
    setExpenseData({
      date: '',
      amount: '',
      reason: '',
      category: '',
    });
  };

  return (
    <Box sx={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      padding: 2,
    }}>
      <Paper elevation={15} sx={{
        padding: 5,
        maxWidth: 600,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#ffffffee', 
        boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease-out',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.2)',
        },
        '@media (min-width: 600px)': {
          width: '90%', // For medium to large screens, width will be 90%
        },
        '@media (min-width: 1024px)': {
          width: '60%', // For even larger screens, width will be 60%
        }
      }}>
        <Typography variant="h4" gutterBottom align="center" color="primary" sx={{
          fontWeight: 'bold', 
          fontSize: '1.5rem',
          textTransform: 'uppercase',
        }}>
          Add New Expense
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Date"
                type="date"
                name="date"
                value={expenseData.date}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: '#fff',
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Amount"
                type="number"
                name="amount"
                value={expenseData.amount}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    '&:focus': {
                      borderColor: '#3f51b5',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={expenseData.category}
                  onChange={handleInputChange}
                  sx={{
                    '& .MuiSelect-root': {
                      backgroundColor: '#fff',
                      borderRadius: 2,
                      padding: '10px',
                      '&:hover': {
                        backgroundColor: '#f1f1f1',
                      },
                    },
                  }}
                >
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Transport">Transport</MenuItem>
                  <MenuItem value="Shopping">Shopping</MenuItem>
                  <MenuItem value="Entertainment">Entertainment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Reason"
                name="reason"
                value={expenseData.reason}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: '#fff',
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                fullWidth
                sx={{
                  fontWeight: 'bold',
                  padding: '14px',
                  fontSize: '1rem',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: '#4caf50',
                    transform: 'scale(1.05)',
                    boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                Add Expense
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddExpenseForm;