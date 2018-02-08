import React from 'react';

const Search = props => (
  <div className="search-bar form-inline">
    <input className="form-control" type="text" onKeyUp={(e) => props.handleSearchInput(e)} />
    <button className="btn hidden-sm-down" onClick={(e) => props.handleSearchButton(e)}>
      <span className="glyphicon glyphicon-search" />
    </button>
  </div>
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined

//window.Search = Search;

export default Search;
