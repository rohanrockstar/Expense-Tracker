import React from 'react';
import { Button, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Categories = ({ setFilterCategory }) => {
  const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills'];

  return (
    <Box sx={{
      background: 'linear-gradient(#e66465, #9198e5)', // Subtle gradient background
      padding: 3,
      borderRadius: 3,
      boxShadow: 4,
      maxWidth: 800,
      margin: 'auto',
      mt: 4,
    }}>
      <Typography variant="h6" sx={{
        marginBottom: 3,
        fontWeight: 'bold',
        color: '#fff',
        fontSize: '1.3rem',
        textAlign: 'center',
      }}>
        Filter by Category
      </Typography>

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* "All" Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFilterCategory('')}
          sx={{
            padding: '12px 25px',
            fontWeight: 'bold',
            backgroundColor: '#f1f1f1',
            color: '#333',
            '&:hover': {
              backgroundColor: '#65DAFF',
              color: '#fff',
            },
          }}
        >
          All
        </Button>

        {/* Category Buttons */}
        {categories.map((category, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => setFilterCategory(category)}
            sx={{
              padding: '12px 25px',
              textTransform: 'capitalize',
              borderColor: '#65DAFF',
              color: '#65DAFF',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#65DAFF',
                color: '#fff',
                borderColor: '#65DAFF',
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      {/* Input Fields Section */}
      <Box sx={{ marginTop: 4 }}>
        <TextField
          label="Enter Amount"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
            '& .MuiInputLabel-root': {
              color: '#fff',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#65DAFF',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#65DAFF',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#65DAFF',
            },
          }}
        />

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel sx={{ color: '#fff' }}>Select Category</InputLabel>
          <Select
            defaultValue=""
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#65DAFF',
              },
              '& .MuiInputLabel-root': {
                color: '#fff',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#65DAFF',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#65DAFF',
              },
            }}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Categories;
