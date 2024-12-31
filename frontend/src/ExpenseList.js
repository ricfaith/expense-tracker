import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch expenses
    axios.get('/expenses')
      .then(response => setExpenses(response.data))
      .catch(error => console.error('Error fetching expenses:', error));

    // Fetch categories
    axios.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.description} - ${expense.amount} ({expense.category})
          </li>
        ))}
      </ul>
      <h3>Categories</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;