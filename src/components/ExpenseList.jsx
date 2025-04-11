import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Typography,
  ListItemIcon,
} from "@mui/material";
import {
  Fastfood,
  LocalGroceryStore,
  FlightTakeoff,
  AccountBalanceWallet,
} from "@mui/icons-material";

const ExpenseList = ({ expenses }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return <Fastfood />;
      case "Shopping":
        return <LocalGroceryStore />;
      case "Travel":
        return <FlightTakeoff />;
      case "Others":
        return <AccountBalanceWallet />;
      default:
        return <AccountBalanceWallet />;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 7,
        marginTop: 6,
        borderRadius: 2,
        backgroundColor: "rgb(173, 216, 230)",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        color="primary"
        fontWeight="600"
      >
        Expense List
      </Typography>
      <List>
        {expenses.length === 0 ? (
          <Typography variant="body1" align="center">
            No expenses added yet!
          </Typography>
        ) : (
          expenses.map((expense, index) => (
            <div key={index}>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <ListItemIcon>{getCategoryIcon(expense.category)}</ListItemIcon>
                <ListItemText
                  primary={`${expense.reason} - ₹${expense.amount}`}
                  secondary={`Date: ${expense.date} | Category: ${expense.category}`}
                />
              </ListItem>
              {index < expenses.length - 1 && <Divider />}
            </div>
          ))
        )}
      </List>
    </Paper>
  );
};

export default ExpenseList;
