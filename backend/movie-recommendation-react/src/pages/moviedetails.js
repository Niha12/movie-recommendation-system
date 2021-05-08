import React, {Component} from "react";
import Header from "../components/header";
import Rating from "../components/rating";
import styles from "./../App.css"
import CarouselMovies from "../components/carouselmovies";
import Parser from 'html-react-parser';
import {Link} from "react-router-dom";
import image from "./../images/no-image-found.png"
import Footer from "../components/footer";

// A page with details of a chosen movie
export default class MovieDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movieInfo: [],
            movieTrailer: '',
            similarMovies:[],
            movieID: props.location.state.movie,
            cast:[],
            providers:[],
            providerUrl: ""
        }

        this.apiKey = process.env.REACT_APP_TMDB_API_KEY
        console.log(this.state.movieID)
    }


    // Gets the required information about the movie to be displayed
    getMovieInformation() {
        fetch('https://api.themoviedb.org/3/movie/' + this.state.movieID + '?api_key=' + this.apiKey + '&language=en-US')
            .then(response => response.json())
            .then(response => {
                this.setState({isLoading: false, movieInfo: [response]})
            }
            )


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
        for (let genre in props){
            htmlResult = htmlResult + "" +
                "<span class=\"tag\">" +
                "<a style=\"color:white;\" href='/genres#" + props[genre].name +
                "'>"+props[genre].name+"</a>"+"</span>"

        }

        return (htmlResult)
    }

    async getCastDetails() {
        await fetch('https://api.themoviedb.org/3/movie/' + this.state.movieID + '/credits?api_key=' + this.apiKey + '&language=en-US')
            .then(response => response.json())
            .then(response => {

                this.setState({cast: response.cast.slice(0,10)})
            })


    }

    // Gets a list of where the movie can be found
    async getMovieProviders(){
        await fetch('https://api.themoviedb.org/3/movie/' + this.state.movieID + '/watch/providers?api_key=' + this.apiKey)
            .then(response => response.json())
            .then(response => {
                if(response.results.GB.flatrate){
                    this.setState({providers: response.results.GB.flatrate, providerUrl:response.results.GB.link})
                }

            })

    }


    componentDidMount() {
        this.getMovieInformation()
        this.getCastDetails()
        this.getMovieProviders()

    }

    // If an another movie is clicked on, it updates it with that movie information
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

                                <Rating name = {movie.id} year={movie.release_date}  genres={movie.genres} />

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
                                {
                                    this.state.providers.length !== 0 ? <p style={{float:"left", color:"red"}}>Streaming Providers: </p>:null
                                }
                                {
                                    this.state.providers.map((provider)=>(
                                        <a href={this.state.providerUrl}>
                                            <img src={"https://image.tmdb.org/t/p/w500/"+provider.logo_path}
                                                alt="provider" className="provider"/>
                                        </a>
                                    ))
                                }
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
                <Footer/>
            </div>
        )
    }


}