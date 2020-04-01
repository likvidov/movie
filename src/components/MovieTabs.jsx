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
          Популярные по убыванию
        </div>
        <div 
          className={getSortBy("popularity.asc")}
          onClick={updateSortBy.bind(null, "popularity.asc")}
        >
          Популярные по возрастанию
        </div>
        
      </li>
      
      <li className="nav-item">
        <div 
          className={getSortBy("revenue.desc")}
          onClick={updateSortBy.bind(null, "revenue.desc")}
        >
          Доход по убыванию
        </div>
        <div 
          className={getSortBy("revenue.asc")}
          onClick={updateSortBy.bind(null, "revenue.asc")}
        >
          Доход по возрастанию
        </div>
      </li>
      <li className="nav-item">
        <div 
          className={getSortBy("vote_average.desc")}
          onClick={updateSortBy.bind(null, "vote_average.desc")}
        >
          Рейтинг по убыванию
        </div>
        <div 
          className={getSortBy("vote_average.asc")}
          onClick={updateSortBy.bind(null, "vote_average.asc")}
        >
          Рейтинг по возрастанию
        </div>
      </li>
    </ul>
  )
}

export default MovieTabs;