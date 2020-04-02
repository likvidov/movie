import React from "react";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import { API_URL, API_KEY_3 } from "../utils/api";
import PaginationItem from "./PaginationItem";
import MovieModal from "./MovieModal";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviesWillWatch: JSON.parse(localStorage.getItem("moviesWillWatch")) || [],
      sort_by: "popularity.desc",
      currentPage: 1,
      totalPages: 0,     
      showMovieId: null
    };
  }  

  showMovie = id => {
    this.setState({
      showMovieId: id
    });
    document.querySelector('#movieModal').classList.add("d-block");
  };

  closeMovie = () => {
    this.setState({
      showMovieId: null
    });
    document.querySelector('#movieModal').classList.remove("d-block");
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value,
      currentPage: 1
    });
  }

  switherPage = (value, event) => {
    event.preventDefault();
    this.setState({
      currentPage: value
    });
  }

  getMovies = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${this.state.sort_by}&page=${this.state.currentPage}`)
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
    updateMoviesWillWatch.push([movie.id, movie.title, movie.vote_average]);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });

    localStorage.setItem('moviesWillWatch', JSON.stringify(updateMoviesWillWatch))
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item[0] !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
    
    localStorage.setItem('moviesWillWatch', JSON.stringify(updateMoviesWillWatch))
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
                  <div className="col-6 mb-4 mh-50" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                      showMovie={this.showMovie}
                      willWatch={this.state.moviesWillWatch.find(item => item[0] === movie.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <h4 >Смотреть позже: <span className="badge badge-primary">{this.state.moviesWillWatch.length}</span></h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie[0]} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie[1]}</p>
                    <p>{movie[2]}</p>
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
        <MovieModal showMovieId={this.state.showMovieId} closeMovie={this.closeMovie}/>
      </div>
    );
  }
}

export default App;
