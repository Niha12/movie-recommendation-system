import React, { Component } from "react";
import Header from "../components/header";
import SearchBox from "./searchbox";
import MovieList from "./movielist";
import CarouselMovies from "./carouselmovies"

export default class Main extends Component {
    constructor() {
        super()
        this.state = {
            movies: [],
            searchTerm: '',
            isSubmit: false
        }
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'
        //Maybe change this to be in an .env file to make it private
        console.log("search term: " + this.state.searchTerm)
    }

    handleSubmit = (e) => {
        if (this.state.searchTerm === ''){
            this.setState({isSubmit:false})
        }else{
            this.setState({isSubmit:true})
        }

        e.preventDefault();

        fetch('https://api.themoviedb.org/3/search/movie?api_key='+this.apiKey+'&language=en-US&query='+this.state.searchTerm)
            .then(data => data.json())
            .then(data =>
            {
                console.log(data)
                this.setState({movies:[...data.results]})
            })
        console.log("search term: " + this.state.searchTerm)
    }

    handleChange = (e) => {
        if (this.state.searchTerm === '') {
            this.setState({isSubmit: false})
        }
        this.setState({searchTerm: e.target.value})
    }


    getPopularMovies = () => {
        console.log("search term: " + this.state.searchTerm)
        fetch('https://api.themoviedb.org/3/movie/popular?api_key='+this.apiKey+'&language=en-US&page=1')
            .then(data => data.json())
            .then(data =>
            {
                console.log(data)
                this.setState({movies:[...data.results]})
            })
        return this.state.movies;
    }

    getLatestMovies = () => {
        console.log("search term: " + this.state.searchTerm)
        fetch('https://api.themoviedb.org/3/movie/latest?api_key='+this.apiKey+'&language=en-US')
            .then(data => data.json())
            .then(data =>
            {
                console.log(data)
                this.setState({movies:[...data.results]})
            })
        return this.state.movies;

    }
    render() {
        return (
            <div>
                <Header/>
                <div>
                    <SearchBox handleSubmit ={this.handleSubmit} handleChange = {this.handleChange}/>
                    {
                        this.state.isSubmit === false ?
                        <div>
                            <h1>POPULAR MOVIES</h1>
                            <CarouselMovies movies={this.getPopularMovies()}/>
                            <h1>LATEST</h1>
                            <CarouselMovies movies={this.getLatestMovies()}/>
                            <h1>TOP RATED</h1>
                        </div> :
                            <div>
                                <h1>You searched {this.state.searchTerm}</h1>
                                <MovieList movies={this.state.movies}/>
                            </div>
                    }
                </div>
            </div>
        )
    }

}

//
//   {
//     (this.state.searchTerm = '') ?
//         <MovieList movies={this.getPopularMovies()}/>:
//         <MovieList movies={this.state.movies}/>
// }