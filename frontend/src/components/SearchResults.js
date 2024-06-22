import React from 'react';
import { useLocation } from 'react-router-dom';
import ProgrammerCard from './ProgrammerCard';

const SearchResults = () => {
  const location = useLocation();
  const { results } = location.state;

  return (
    <div>
      <h1>Search Results</h1>
      <div className="results-container">
        {results.map((programmer, index) => (
          <ProgrammerCard key={index} programmer={programmer} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
