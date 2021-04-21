import {Component} from "react";
import Header from "../components/header";
import MovieList from "../components/movielist";
import Footer from "../components/footer";

export default class CastMovies extends Component {

    constructor(props){
        super(props);
        this.state={
            castId:props.location.state.cast,
            castName:props.location.state.name,
            movies:[],
            loading:true
        }
        console.log(this.state.castName)
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'
    }

    async getMovies(){
        await fetch('https://api.themoviedb.org/3/person/'+this.state.castId+'/movie_credits?api_key='+this.apiKey+'&language=en-US')

            .then(data => data.json())
            .then(data => {
                this.setState({movies: data.cast,loading:false})
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
                <Footer/>
            </div>
        )
    }
}