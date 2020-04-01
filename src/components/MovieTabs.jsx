import React from "react";

const MovieTabs = props => {

  const {sortBy, updateSortBy} = props;

  const getSortBy = value => {
    return `nav-link ${sortBy === value ? "active" : ""}`;
  }

  return (
    <ul className="tabs nav nav-pills">
      <li className="nav-item">
        <div 
          className={getSortBy("popularity.desc")}
          onClick={updateSortBy.bind(null, "popularity.desc")}
        >
          Popularity desc
        </div>
      </li>
      <li className="nav-item">
        <div 
          className={getSortBy("revenue.desc")}
          onClick={updateSortBy.bind(null, "revenue.desc")}
        >
          Revenue desc
        </div>
      </li>
      <li className="nav-item">
        <div 
          className={getSortBy("vote_average.desc")}
          onClick={updateSortBy.bind(null, "vote_average.desc")}
        >
          Vote average desc
        </div>
      </li>
    </ul>
  )
}

export default MovieTabs;