import React from "react";
//import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from '../utils/api';
import MovieTabs from './movie-tabs';
import Pagination from './pagination';

// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: 'popularity.desc',
      number_page: 1
    };
  }
  componentDidMount() {
    this.getMovies()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies()
    }
    if (prevState.number_page !== this.state.number_page) {
      this.getMovies()
    }
  }

  getMovies = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.number_page}`)
      .then((response) => {
        console.log('then')
        return response.json()
      })
      .then((data) => {
        console.log('data', data)
        this.setState({
          movies: data.results
        })
      })
  }

  deleteMovie = movie => {
    console.log(movie.id);
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
    console.log(updateMovies);

    // this.state.movies = updateMovies;
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

  updateSortBy = (value) => {
    this.setState({
      sort_by: value
    })
  }

  nextPage = (page) => {
    const nextPage = page + 1;
    
    this.setState({
      number_page: nextPage === 501 ? 500 : nextPage 
    })
  };

  previousPage = (page) => {
    const previousPage = page - 1;
    
    this.setState({
      number_page: previousPage === 0 ? 1 : previousPage
    })
  };



  render() {
    console.log("render", this);
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy} />
              </div>
            </div>
            <div className="mb-4 d-flex justify-content-around">
              <div>
                <Pagination
                  numberPage={this.state.number_page}
                  nextPage={this.nextPage} 
                  previousPage={this.previousPage}/>
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
      </div>
    );
  }
}

export default App;
