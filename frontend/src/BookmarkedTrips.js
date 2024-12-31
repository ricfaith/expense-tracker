import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookmarkedTrips = () => {
  const [bookmarkedTrips, setBookmarkedTrips] = useState([]);

  useEffect(() => {
    axios.get('/user/bookmarks')
      .then(response => setBookmarkedTrips(response.data))
      .catch(error => console.error('Error fetching bookmarked trips:', error));
  }, []);

  return (
    <div>
      <h2>Your Bookmarked Trips</h2>
      <ul>
        {bookmarkedTrips.map(trip => (
          <li key={trip.id}>
            <h3>{trip.name}</h3>
            <p>{trip.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkedTrips;