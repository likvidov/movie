import React from "react";

class MovieItem extends React.Component {
  constructor(props) {
    super();
    this.state = {
      willWatch: props.willWatch ? true : false,
    };
  }

  render() {
    const {
      data,
      deleteMovie,
      addMovieToWillWatch,
      deleteMovieFromWillWatch,
      showMovie      
    } = this.props;
    
    return (
      <div className="card overflow-hidden" style={{height: "400px"}}>
        
          <img
            className="card-img-top img-fluid rounded img-responsive"
            src={`https://image.tmdb.org/t/p/w500${data.backdrop_path ||
              data.poster_path}`}
            alt=""
            style={{height: "250px"}}
          />
        
        <div className="card-body">
          <h6 className="card-title">{data.title}</h6>
          <p className="mb-2">Рейтинг: {data.vote_average}</p>
          <div className="d-flex justify-content-between align-items-center">            
            {this.state.willWatch ? (
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  this.setState({
                    willWatch: false
                  });
                  deleteMovieFromWillWatch(data);
                }}
              >
                Просмотрено
              </button>
              ) : (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.setState({
                    willWatch: true
                  });
                  addMovieToWillWatch(data);
                }}
              >
                Смотреть позже
              </button>
              )}

              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  showMovie(data.id)
                }}
              >
                Подробнее
              </button>
              
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  deleteMovie(data);
                }}
              >
                Удалить
              </button>
          </div>
          
        </div>
      </div>
    );
  }
}

export default MovieItem;
