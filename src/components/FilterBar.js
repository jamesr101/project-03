import React from 'react';

const FilterBar = ({ handleChange }) => {
  return (
    <form>
      <div className="field is-grouped">
        <div className="control">
          <div className="select">
            <select name="sort" onChange={handleChange}>
              <option value="name|asc">Name A - Z</option>
              <option value="name|desc">Name Z - A</option>
              <option value="area|desc">Area Hi - Lo</option>
              <option value="area|asc">Area Lo - Hi</option>
            </select>
          </div>
        </div>
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
