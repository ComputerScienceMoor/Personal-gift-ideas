import React from 'react';

const Filter = ({ occasions, selectedOccasion, onFilterChange }) => {
  return (
    <div>
      <h3>Filter by Occasion</h3>
      <div className="filter-buttons">
        {occasions.map((occasion) => (
          <button
            key={occasion}
            className={`filter-btn ${selectedOccasion === occasion ? 'active' : ''}`}
            onClick={() => onFilterChange(occasion)}
          >
            {occasion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
