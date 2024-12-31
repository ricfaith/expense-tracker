import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get('/user/trips')
      .then(response => setTrips(response.data))
      .catch(error => console.error('Error fetching user trips:', error));
  }, []);

  return (
    <div>
      <h2>Your Trips</h2>
      <ul>
        {trips.map(trip => (
          <li key={trip.id}>
            <h3>{trip.name}</h3>
            <p>{trip.description}</p>
            <p>Likes: {trip.likes}</p>
            <p>Bookmarks: {trip.bookmarks}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;