import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // Fetch categories
    axios.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const addCategory = () => {
    if (newCategory) {
      axios.post('/categories', { category: newCategory })
        .then(() => {
          setCategories([...categories, newCategory]);
          setNewCategory('');
        })
        .catch(error => console.error('Error adding category:', error));
    }
  };

  const deleteCategory = (category) => {
    axios.delete(`/categories/${category}`)
      .then(() => {
        setCategories(categories.filter(cat => cat !== category));
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category"
      />
      <button onClick={addCategory}>Add Category</button>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category}
            <button onClick={() => deleteCategory(category)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;