import React, { Component } from "react";
import Header from "../components/header";
import SearchBox from "./searchbox";
import MovieList from "./movielist";
import CarouselMovies from "./carouselmovies"

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
            isSubmit: false
        }
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'
        //Maybe change this to be in an .env file to make it private
        //console.log("search term: " + this.state.searchTerm)
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
        // console.log("search term: " + this.state.searchTerm)
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
                this.setState({movies:[...data.results]})
                // let movies = {movies:[...data.results]}
                // return movies.movies;
            })
        return this.state.movies;
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

    // This doesnt give a console error if we get popular movies
    getLatestMovies = () => {
        // console.log("search term: " + this.state.searchTerm)
        fetch('https://api.themoviedb.org/3/movie/latest?api_key='+this.apiKey+'&language=en-US')
            .then(data => data.json())
            .then(data =>
            {
                // let movies = []
                // for (const result of data.results){
                //     movies = movies + result
                // }
                // // console.log(data)
                // this.setState({movies:movies})

                this.setState({latest:[...data.results]})
                // let movies = {movies:[...data.results]}
                // return movies.movies;

            })
        return this.state.latest;

    }
    render() {
        let popularMovies = this.getPopularMovies()
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
                            <h1>POPULAR MOVIES</h1>
                            <CarouselMovies movies={popularMovies}/>
                            <h1>LATEST</h1>
                            {/*<CarouselMovies movies={latestMovies}/>*/}
                            <h1>TOP RATED</h1>
                            {/*<CarouselMovies movies={topRatedMovies}/>*/}
                        </div> :
                            <div>
                                <h1>You searched {this.state.searchTerm}</h1>
                                {/*{*/}
                                {/*    this.state.movies.length === 0 ?*/}
                                {/*        <h2>No Movies Found</h2>*/}
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