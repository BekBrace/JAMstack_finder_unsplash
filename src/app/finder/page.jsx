"use client"

// Error handling is implemented to log any fetch errors to the console.
import { useState } from 'react';
import styles from './finder.module.css';

export default function Finder() {
  const [query, setQuery] = useState(''); // State to manage search query
  const [results, setResults] = useState([]); // State to manage search results

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (query.trim() === '') return; // If query is empty, do nothing

    try {
      // Send a GET request to Unsplash API with the search query
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=TcBgXI888zIHbUNS5z0k86-ZpmW4oxY_C_ABPJtxowk`);
      // Extract JSON response
      const data = await response.json();
      // Update results state with the fetched data
      setResults(data.results);
    } catch (error) {
      // Log any errors to the console
      console.error('Error fetching data:', error);
    }
  };

  // JSX to render the Finder component
  return (
    <div className={styles}>
      <h1 className={styles.title}>Photo Finder</h1>
      {/* Form for user input */}
      <form id="search-form" onSubmit={handleSubmit} className={styles.form}>
        <input type="text" id="search-query" placeholder="Search for photos" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {/* Display search results */}
      <div id="results" className={styles.results}>
        {/* Map over results and render images */}
        {results.map((photo) => (
          <img 
          key={photo.id} 
          src={photo.urls.regular} 
          alt={photo.alt_description} />
        ))}
      </div>
    </div>
  );

}