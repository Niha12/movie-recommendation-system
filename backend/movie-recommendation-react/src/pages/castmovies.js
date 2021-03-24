import {Component} from "react";
import Header from "../components/header";
import MovieList from "./movielist";

export default class CastMovies extends Component {

    constructor(props){
        super(props);
        this.state={
            castId:props.location.state.cast,
            castName:props.location.state.name,
            movies:[],
            loading:true
        }

        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'
    }

    async getMovies(){
        console.log(this.state.castId)
        await fetch('https://api.themoviedb.org/3/person/'+this.state.castId+'/movie_credits?api_key='+this.apiKey+'&language=en-US')

            // 'https://api.themoviedb.org/3/person/'+this.state.castId+'/movie_credits?api_key='+ this.apiKey + '&language=en-US')
            //https://api.themoviedb.org/3/person/3223/movie_credits?api_key=0e4224cc4fec38376b7e3f8f073a68c6&language=en-US

            .then(data => data.json())
            .then(data => {
                console.log(data)
                this.setState({movies: data.cast,loading:false})
                // let movies = {movies:[...data.results]}
                // return movies.movies;
            })

    }

    componentDidMount(){
        this.getMovies()
    }

    render(){
        return(
            <div>
                <Header/>
                <h1 className="heading">Movies by {this.state.castName}</h1>
                {
                    this.state.loading === true?
                        <h1>Loading...</h1>
                        :
                        <MovieList movies={this.state.movies}/>
                }
            </div>
        )
    }
}