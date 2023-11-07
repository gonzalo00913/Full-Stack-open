import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const VisibilityFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          name="filter"
          value="ALL"
          checked={filter === 'ALL'}
          onChange={() => handleFilterChange('ALL')}
        />
        All
      </label>

      <label>
        <input
          type="radio"
          name="filter"
          value="IMPORTANT"
          checked={filter === 'IMPORTANT'}
          onChange={() => handleFilterChange('IMPORTANT')}
        />
        Important
      </label>

      <label>
        <input
          type="radio"
          name="filter"
          value="NONIMPORTANT"
          checked={filter === 'NONIMPORTANT'}
          onChange={() => handleFilterChange('NONIMPORTANT')}
        />
        Non-Important
      </label>
    </div>
  );
};

export default VisibilityFilter;
