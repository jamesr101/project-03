import React from 'react';

const FilterBar = ({ handleChange }) => {
  return (
    <form>
      <div className="field is-grouped">
        <div className="control is-expanded has-icons-left">
          <input className="input" name="search" onChange={handleChange} placeholder="Search..." />
          <span className="icon is-small is-left">
            <i>🔍</i>
          </span>
        </div>
      </div>
    </form>
  );
};

export default FilterBar;
