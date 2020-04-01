import React, { Component } from "react";
import { API_URL, API_KEY_3 } from "../utils/api";

export default class MovieModal extends Component {

  constructor() {
    super();

    this.state = {
      movie: {}
    }
  }
  
  componentDidMount() {
    this.props.showMovieId && this.getMovie(this.props.showMovieId);
  }

  componentDidUpdate() {
    if (this.props.showMovieId  && this.props.showMovieId !== this.state.movie.id) {
      this.getMovie(this.props.showMovieId);
    }
  }

  getMovie = movieId => {
    fetch(
      `${API_URL}/movie/${movieId}?api_key=${API_KEY_3}&language=ru-Ru`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          movie: data
        });
      });
  };

  render() {
    const { closeMovie } = this.props;
    const { title, overview, poster_path, release_date, tagline} = this.state.movie;
    return (
      <div id="movieModal" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{"Название: " + title + " Дата релиза: " + release_date}</h5>
              <button 
                type="button" 
                className="close" 
                data-dismiss="modal" 
                aria-label="Close"
                onClick={closeMovie}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row mb-2">
                <img
                      className="offset-md-3"
                      src={`https://image.tmdb.org/t/p/w500${
                        poster_path
                      }`}
                      width="50%"
                      alt=""
                    />
              </div>
              <div className="row">
                <p>{"Подзаголовок: " + tagline}</p>
                <p>{"Описание: " + overview}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-dismiss="modal" 
                onClick={closeMovie}
              >Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
