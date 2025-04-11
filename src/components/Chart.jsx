import React, { useState, useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ expenses }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [option, setOption] = useState('daily');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (!start || !end) {
      setError('Please select both start and end dates.');
      setIsValid(false);
      return;
    }

    if (start > end) {
      setError('Start date cannot be after end date.');
      setIsValid(false);
      return;
    }

    if (option === 'daily') {
      if (startDate > today || endDate > today) {
        setError('Daily report cannot include future dates.');
        setIsValid(false);
        return;
      }
      if (start.toDateString() !== end.toDateString()) {
        setError('Daily report can only show data for a single day.');
        setIsValid(false);
        return;
      }
    }
    
    if (option === 'weekly') {
      const diff = (end - start) / (1000 * 60 * 60 * 24);
      if (diff > 6) {
        setError('Weekly report can only show data for up to 7 days.');
        setIsValid(false);
        return;
      }
    }
    
    if (option === 'monthly') {
      if (start.getMonth() !== end.getMonth() || start.getFullYear() !== end.getFullYear()) {
        setError('Monthly report can only show data for the same month.');
        setIsValid(false);
        return;
      }
    }

    setError('');
    setIsValid(true);
  }, [startDate, endDate, option]);

  const filteredExpenses = useMemo(() => {
    if (!isValid) return [];

    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return (!startDate || expenseDate >= new Date(startDate)) && (!endDate || expenseDate <= new Date(endDate));
    });
  }, [expenses, startDate, endDate, isValid]);

 
  const categoryTotals = useMemo(() => {
    const dailyTotals = {};

    filteredExpenses.forEach(expense => {
      const dateKey = expense.date;
      dailyTotals[dateKey] = (dailyTotals[dateKey] || 0) + parseFloat(expense.amount);
    });

    return dailyTotals;
  }, [filteredExpenses]);
  const totalExpense = useMemo(() => {
    return Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);
  }, [categoryTotals]);

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Amount Spent (INR)',
        data: Object.values(categoryTotals),
        backgroundColor: 'rgb(114, 204, 255)',
        borderColor: 'rgb(114, 204, 255)',
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: { color: 'rgb(11, 11, 11)' },
        ticks: { color: 'rgb(11, 11, 11)' },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgb(11, 11, 11)' },
        ticks: { color: 'rgb(11, 11, 11)' },
      },
    },
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} INR`,
        },
      },
    },
  };

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h5" gutterBottom align="center" color="primary">
        Expense Report
      </Typography>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="End Date"
            type="date"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel>Option</InputLabel>
            <Select
              name="option"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              fullWidth
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" align="center" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      <Typography variant="h6" gutterBottom align="center" color="secondary" sx={{ marginTop: 2 }}>
        Total Expense ({option.charAt(0).toUpperCase() + option.slice(1)}): {totalExpense.toFixed(2)} INR
      </Typography>

      <Bar data={data} options={options} />
    </Box>
  );
};

export default Chart;
