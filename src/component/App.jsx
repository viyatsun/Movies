import React from "react";
import moviesData from './moviesData';
import './app.css';
import MovieItem from './movie-item';

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            movies: moviesData,
            moviesWillWatch: []
        }
    }

    addMovieToWillWatch = movie => {
        console.log(movie)
        // const updateMovieToWillWatch =  [...this.state.moviesWillWatch];
        // updateMovieToWillWatch.push(movie);

        const updateMovieToWillWatch = [...this.state.moviesWillWatch, movie];

        this.setState({
            moviesWillWatch: updateMovieToWillWatch
        })
    }

    removeMovieFromWillWatch = (movie) => {
        const updateMovieToWillWatch = this.state.moviesWillWatch.filter((item) => {
            return item.id !== movie.id
        })
        this.setState({
            moviesWillWatch: updateMovieToWillWatch
        })
    }

    deleteMovie = (movie) => {
        const movieItem = this.state.movies.filter((item) => {
            return item.id !== movie.id
        })
        this.setState({
            movies: movieItem
        })
    }

    render() {
        return (
            <div className="container app">
                <div className="row">
                    <div className="col-9">
                        <div className="row">
                            {this.state.movies.map((movie) => {
                                return (
                                    <div className="col-6 mb-4" key={movie.id}>
                                        <MovieItem movie={movie}
                                            deleteMovie={this.deleteMovie}
                                            addMovieToWillWatch={this.addMovieToWillWatch}
                                            removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-3">
                        <p>Will Watch: {this.state.moviesWillWatch.length} movies</p>
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
        )
    }
}

export default App;