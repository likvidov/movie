import React from "react";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import { API_URL, API_KEY_3 } from "../utils/api";
import PaginationItem from "./PaginationItem";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      currentPage: 1,
      totalPages: 0
    };
  }

  updateSortBy = value => {
    this.setState({
      sort_by: value,
      currentPage: 1
    });
  }

  switherPage = (value, event) => {
    console.log(event.preventDefault())
    event.preventDefault();
    this.setState({
      currentPage: value
    });
  }

  getMovies = () => {
    fetch(API_URL + "/discover/movie?api_key=" + API_KEY_3 + "&language=en-En&sort_by=" + this.state.sort_by + "&page=" + this.state.currentPage)
      .then(response => response.json())
      .then(data => 
        this.setState({
          movies: data.results,
          totalPages: data.total_pages
        })
      )
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by || prevState.currentPage !== this.state.currentPage) {
      this.getMovies();
    }
  }

  deleteMovie = movie => {
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs sortBy={this.state.sort_by} updateSortBy={this.updateSortBy} />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col offset-md-4">
            <PaginationItem 
              currentPage = {this.state.currentPage}
              totalPages = {this.state.totalPages}
              switherPage = {this.switherPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
