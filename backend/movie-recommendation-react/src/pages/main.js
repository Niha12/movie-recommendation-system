import React, { Component } from "react";
import Header from "../components/header";
import SearchBox from "../components/searchbox";
import MovieList from "../components/movielist";
import CarouselMovies from "../components/carouselmovies"
import PreferenceElicitation from "../components/preferenceelicitation";
import firebase from "firebase";
import { auth } from "../services/firebase";
import styles from "./../App.css"
import Footer from "../components/footer";

export default class Main extends Component {
    constructor() {
        super()
        this.refreshPage = this.refreshPage.bind(this)
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'
        this.uuid = auth().currentUser.uid
        this.state = {
            popular:[],
            latest:[],
            toprated:[],
            search:[],
            movies:[],
            searchTerm: '',
            isSubmit: false,
            isLoaded: false,
            isPref:false
        }
        //Maybe change this to be in an .env file to make it private

    }

    handleSubmit = (e) => {
        e.preventDefault();
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

    }

    handleChange = (e) => {
        if (this.state.searchTerm === '') {
            this.setState({isSubmit: false})
        }
        this.setState({searchTerm: e.target.value})
    }


    getPopularMovies = () => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key='+this.apiKey+'&language=en-US&page=1')
            .then(data => data.json())
            .then(data =>
            {
                this.setState({popular:[...data.results]})
            })
        return this.state.popular;
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

    getLatestMovies = () => {
        fetch('https://api.themoviedb.org/3/movie/upcoming?api_key='+this.apiKey+'&language=en-US')
            .then(data => data.json())
            .then(data =>
            {

                this.setState({latest:[...data.results]})

            })
        return this.state.latest;

    }

    async setPref() {
        let num = 0
        let docRef = firebase.firestore().collection("Users")
            .doc(this.uuid).collection("Ratings")

        await docRef.where('rating', "==", 4).get().then(snapshot => {
            num = num + snapshot.size
        })

        await docRef.where('rating', "==", 5).get().then(snapshot => {
            num = num + snapshot.size
        })
        if (num < 3) {
            await this.setState({isPref: true})
        }

        this.setState({isLoaded:true})
    }

    async refreshPage() {
        await this.setState({isPref: false})

    }

    componentWillMount() {
        this.setPref()
    }

    render() {
        if (this.state.isLoaded === true){
            if (this.state.isPref === true) {
                return (
                    <div style={styles}>
                        <Header/>
                        <div className="div">
                            <PreferenceElicitation refreshPage={this.refreshPage}/>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div style={styles}>
                        <Header/>
                        <div className="div">

                            <SearchBox handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
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
                                        <MovieList movies={this.state.movies}/>
                                    </div>
                            }
                        </div>
                        <Footer/>
                    </div>
                )
            }
        }else{
            return(<h2>Loading...</h2>)
        }
    }

}