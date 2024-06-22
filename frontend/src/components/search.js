// Search.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/public-search/?q=${query}`);
      navigate('/search-results', { state: { results: response.data } });
    } catch (error) {
      console.error('Error during search', error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search skills"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
