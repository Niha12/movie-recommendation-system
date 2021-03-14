import React, { Component } from "react";
import Header from "../components/header";
import SearchBox from "./searchbox";
import MovieList from "./movielist";
import CarouselMovies from "./carouselmovies"
import styles from "./../App.css"

export default class Main extends Component {
    constructor() {
        super()
        this.state = {
            popular:[],
            latest:[],
            toprated:[],
            search:[],
            movies:[],
            searchTerm: '',
            isSubmit: false,
            isLoaded: false
        }
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'
        //Maybe change this to be in an .env file to make it private
        //console.log("search term: " + this.state.searchTerm)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // this.setState({isSubmit:true})
        fetch('https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&language=en-US&query=' + this.state.searchTerm)
            .then(data => data.json())
            .then(data => {
                this.setState({movies: [...data.results]})
            })


        if (this.state.searchTerm === '') {
            this.setState({isSubmit: false})
        } else {
            this.setState({isSubmit: true})
        }
        this.setState({isLoaded:true})

    }
    // I changed everything to go back to movies:[] instead of each individual
    handleChange = (e) => {
        if (this.state.searchTerm === '') {
            this.setState({isSubmit: false})
        }
        this.setState({searchTerm: e.target.value})
    }


    getPopularMovies = () => {
        // console.log("search term: " + this.state.searchTerm)
        fetch('https://api.themoviedb.org/3/movie/popular?api_key='+this.apiKey+'&language=en-US&page=1')
            .then(data => data.json())
            .then(data =>
            {
                // console.log(data)
                this.setState({popular:[...data.results]})
                // let movies = {movies:[...data.results]}
                // return movies.movies;
            })
        return this.state.popular;
    }

    getTopRatedMovies = () => {
        // console.log("search term: " + this.state.searchTerm)
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key='+this.apiKey+'&language=en-US&page=1')
            .then(data => data.json())
            .then(data =>
            {
                this.setState({toprated:[...data.results]})
            })
        return this.state.toprated;
    }


    getBiggestGrossingMovies =() => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key='+this.apiKey+'&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1')
            .then(data => data.json())
            .then(data =>
            {
                this.setState({toprated:[...data.results]})
            })
        return this.state.toprated;



    }
    // This doesnt give a console error if we get popular movies
    getLatestMovies = () => {
        // console.log("search term: " + this.state.searchTerm)
        fetch('https://api.themoviedb.org/3/movie/upcoming?api_key='+this.apiKey+'&language=en-US')
            .then(data => data.json())
            .then(data =>
            {

                this.setState({latest:[...data.results]})

            })
        return this.state.latest;

    }
    render() {
        // let latestMovies = this.getLatestMovies()
        // let topRatedMovies = this.getTopRatedMovies()
        return (
            <div>
                <Header/>
                <div>
                    <SearchBox handleSubmit = {this.handleSubmit} handleChange = {this.handleChange}/>
                    {
                        this.state.isSubmit === false ?
                        <div>
                            <h1 className="heading">POPULAR MOVIES</h1>
                            <CarouselMovies movies={this.getPopularMovies()}/>
                            <h1 className="heading">LATEST</h1>
                            <CarouselMovies movies={this.getLatestMovies()}/>
                            <h1 className="heading">TOP GROSSING FILMS</h1>
                            <CarouselMovies movies={this.getBiggestGrossingMovies()}/>
                        </div>
                            :
                        <div>
                            <h1 className="heading">You searched {this.state.searchTerm}</h1>
                            {/*{*/}
                            {/*    this.state.isLoaded === false ?*/}
                            {/*        <h2>Loading movies...</h2>*/}
                            {/*        :*/}
                            <MovieList movies={this.state.movies}/>
                            {/*}*/}
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