import React, {Component} from "react";
import Header from "../components/header";
import Rating from "./rating";
import styles from "./../App.css"
import CarouselMovies from "./carouselmovies";


export default class MovieDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movieInfo: [],
            movieTrailer: '',
            similarMovies:[]
        }
        this.movieID = props.location.state.movie;
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'
    }

    getMovieInformation() {
        // console.log("search term: " + this.state.searchTerm)
        fetch('https://api.themoviedb.org/3/movie/' + this.movieID + '?api_key=' + this.apiKey + '&language=en-US')
            .then(response => response.json())
            .then(response => {
                // console.log(data)
                this.setState({isLoading: false, movieInfo: [response]})

                // let movies = {movies:[...data.results]}
                // return movies.movies;
            })


        fetch('https://api.themoviedb.org/3/movie/' + this.movieID + '/videos?api_key=' + this.apiKey + '&language=en-US')
            .then(data => data.json())
            .then(data => {
                let key = ''

                let arr = [...data.results]
                for (let i = 0; i < arr.length; i++) {

                    if (arr[i].type === "Trailer") {
                        key = arr[i].key
                        break;
                    }
                }
                this.setState({movieTrailer:"https://www.youtube.com/embed/"+key})

            })

        fetch('https://api.themoviedb.org/3/movie/'+this.movieID +'/similar?api_key=' + this.apiKey + '&language=en-US&page=1')
            .then(data => data.json())
            .then(data => {

                this.setState({similarMovies:[...data.results]})

            })
    }

    getBackgroundImage = (props) => {
        return "https://image.tmdb.org/t/p/w500/" + props.name
    }

    getMovieGenres = (props) => {
        let htmlResult = ''
        for (let genre in props.genres){
            htmlResult = htmlResult + ('<span className="tag">' + genre.name + '</span>')
        }
        // document.getElementByClassName("demo").innerHTML = htmlResult
        return "<p>hellooo</p>"
    }

    componentWillMount() {

        this.getMovieInformation()

    }

    render(){
        return(
            <div>
                <Header/>
                <div className="movie-card1">
                    {this.state.movieInfo.map((movie) => (
                    <div className="container-movie-details">

                    <img src={"https://image.tmdb.org/t/p/w500/"+movie.poster_path}
                                     alt="cover" className="cover"/>

                        <div className="hero" style={{backgroundImage: "url(https://image.tmdb.org/t/p/w500/"+ movie.backdrop_path + ")"}}>

                            <div className="details1">

                                <div className="title1">{movie.title}  <span>{movie.release_date}</span></div>

                                <div className="title2">{movie.tagline}</div>

                                <Rating name = {movie.id}/>

                            </div>

                        </div>

                        <div className="description">

                            <div className="column1">
                                {/*{*/}
                                {/*    movie.genres.forEach((genre) => {*/}
                                {/*        <span className="tag">Genre</span>*/}
                                {/*        }*/}

                                {/*    )*/}
                                {/*}*/}
                                <span className="tag">Genre</span>

                            </div>

                            <div className="column2">

                                <p>{movie.overview}</p>
                                <div>
                                    <span className = "tag">
                                    {
                                        this.getMovieGenres(movie.genres)
                                    }
                                    </span>
                                </div>

                            </div>

                            <div className="column3">

                                <iframe width="420" height="300" src={this.state.movieTrailer}/>

                            </div>
                        </div>

                        <CarouselMovies movies={this.state.similarMovies}/>
                    </div>
                    ))}
                </div>
            </div>
        )
    }


}