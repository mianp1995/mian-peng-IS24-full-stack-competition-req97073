import React from 'react';

const SearchBar = ({ searchValue, handleSearch }) => {
  return (
    <div>
      <input type="text" placeholder="Search by Scrum Master Name" value={searchValue} onChange={(e) => handleSearch(e.target.value)} />
    </div>
  );
};

export default SearchBar;
