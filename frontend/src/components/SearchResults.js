import React from 'react';
import { useLocation } from 'react-router-dom';
import ProgrammerCard from './ProgrammerCard';

const SearchResults = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  return (
    <div className="container">
      <div className="row">
        {results.map((programmer) => (
          <div className="col-md-4" key={programmer.id}>
            <ProgrammerCard programmer={programmer} onSeeMore={(id) => console.log(`See more clicked for programmer ${id}`)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;