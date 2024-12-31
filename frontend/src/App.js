import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExpenseList from './ExpenseList';
import AddExpense from './AddExpense';
import EditExpense from './EditExpense';
import ManageCategories from './ManageCategories';
import UserDashboard from './UserDashboard';
import BookmarkedTrips from './BookmarkedTrips';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Expense Tracker</h1>
        <Switch>
          <Route path="/" exact component={ExpenseList} />
          <Route path="/add" component={AddExpense} />
          <Route path="/edit/:id" component={EditExpense} />
          <Route path="/categories" component={ManageCategories} />
<Route path="/dashboard" component={UserDashboard} />
<Route path="/bookmarks" component={BookmarkedTrips} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;