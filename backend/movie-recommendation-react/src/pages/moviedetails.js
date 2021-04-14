import React, {Component} from "react";
import Header from "../components/header";
import Rating from "./rating";
import styles from "./../App.css"
import CarouselMovies from "./carouselmovies";
import Parser from 'html-react-parser';
import {Link} from "react-router-dom";
import image from "./../images/no-image-found.png"
import {Card} from "react-bootstrap";

export default class MovieDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movieInfo: [],
            movieTrailer: '',
            similarMovies:[],
            movieID: props.location.state.movie,
            cast:[]
        }
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'
    }

    getMovieInformation() {
        console.log("in get movie info")
        fetch('https://api.themoviedb.org/3/movie/' + this.state.movieID + '?api_key=' + this.apiKey + '&language=en-US')
            .then(response => response.json())
            .then(response => {
                // console.log(data)
                this.setState({isLoading: false, movieInfo: [response]})

                // let movies = {movies:[...data.results]}
                // return movies.movies;
            })


        fetch('https://api.themoviedb.org/3/movie/' + this.state.movieID + '/videos?api_key=' + this.apiKey + '&language=en-US')
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

        fetch('https://api.themoviedb.org/3/movie/'+this.state.movieID +'/similar?api_key=' + this.apiKey + '&language=en-US&page=1')
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
        console.log("in get movie Genres")
        for (let genre in props){
            console.log(props[genre].name)
            // htmlResult = htmlResult + "<span className = 'tag'>"+props[genre].name+"</span>"
            // htmlResult = htmlResult + "&lt;span className = 'tag'&gt;"+props[genre].name+"&lt;/span&gt;"
            htmlResult = htmlResult + "<span class=\"tag\">"+props[genre].name+"</span>"

        }

        //            htmlResult = htmlResult + "&lt;span className = 'tag'&gt;"+props[genre].name+"&lt;/span&gt;"
        // document.getElementByClassName("demo").innerHTML = htmlResult
        console.log(htmlResult)
        return (htmlResult)
    }

    async getCastDetails() {
        let cast1 = ""
        await fetch('https://api.themoviedb.org/3/movie/' + this.state.movieID + '/credits?api_key=' + this.apiKey + '&language=en-US')
            .then(response => response.json())
            .then(response => {
                console.log(response)

                this.setState({cast: response.cast.slice(0,10)})
            })

        console.log(this.state.cast)

    }
    componentDidMount() {

        this.getMovieInformation()
        this.getCastDetails()

    }

    async componentDidUpdate(prevProps, prevState) {
        if(this.props.location.state.movie !== prevProps.location.state.movie){
            await this.setState({movieID: this.props.location.state.movie})
            this.componentDidMount()
        }

    }

    render(){
        return(
            <div>
                <Header/>
                <div style={{styles}}>
                    {this.state.movieInfo.map((movie) => (
                    <div className="container-movie-details">
                        <div className="hero" style={{backgroundImage: "url(https://image.tmdb.org/t/p/w500/"+ movie.backdrop_path + ")"}}>

                            <div className="details1">

                                <div className="title1">{movie.title}  <span>{movie.release_date}</span></div>

                                <div className="title2">{movie.tagline}</div>

                                <Rating name = {movie.id} year={movie.release_date}/>

                            </div>
                        </div>
                        <div className="description">

                            <div className="column1" style={{marginTop:"50px"}}>
                                {
                                    movie.poster_path !== null ?
                                        <img src={"https://image.tmdb.org/t/p/w500/"+movie.poster_path}
                                             alt="cover" className="cover"/>
                                             :
                                        <img src={image} alt='cover' className="cover"/>
                                }
                                <p style={{fontSize:"15px", color:"blue", float:"left"}}>Average rating: {(Math.round(movie.vote_average * 10) / 10)/2}/5</p>

                                 <div style={{maxWidth:"200px"}}>
                                    {Parser(this.getMovieGenres(movie.genres))}
                                 </div>
                            </div>

                            <div className="column2">

                                <p>{movie.overview}</p>
                                <div>
                                    <h3 style={{marginTop:2}}>Cast</h3>
                                    {
                                        this.state.cast.map((cast)=>(
                                            <span style={{marginRight:10}}><Link to={{pathname:'/cast/'+cast.id ,state:{cast:cast.id,name:cast.name}}}>{cast.name}</Link></span>

                                        ))
                                    }
                                </div>

                            </div>

                            <div className="column3">

                                <iframe width="420" height="300" src={this.state.movieTrailer}/>

                            </div>
                        </div>
                        <div style={{marginTop:"120px"}}>
                            <h1 className="heading">Similar movies to {movie.title}</h1>
                            <CarouselMovies style={{paddingTop:"50px"}} movies={this.state.similarMovies}/>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        )
    }


}