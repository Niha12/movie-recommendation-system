import {Component} from "react";
import Header from "../components/header";
import MovieList from "./movielist";

export default class Genres extends Component {
    constructor(props){
        super(props);
        this.state={
            genres:[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science-Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}],
            genreChosen: props.location.hash,
            genreChosenId:0,
            movies: [],
            loading:true
        }
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'

    }

    fetchMovies() {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + this.apiKey + '&with_genres=' + this.state.genreChosenId + '&language=en-US&page=1')
            .then(data => data.json())
            .then(data => {
                // console.log(data)
                this.setState({movies: [...data.results],loading:false})
                // let movies = {movies:[...data.results]}
                // return movies.movies;
            })
        // return this.state.movies;
        console.log("inside fetch movies")
        console.log(this.state.movies)
    }

    async componentWillMount() {
        // console.log(this.state.genreChosen)
        let genre = this.state.genreChosen.split('#')[1]
        let id = 0
        console.log("In component will mount genre: "+genre)
        this.state.genres.forEach(function (d) {
            if (d.name === genre) {
                id = d.id
                return
            }
        })
        await this.setState({genreChosenId: id})
        console.log("In component will mount id: "+this.state.genreChosenId)
        this.fetchMovies()
        // this.render()
    }
    //
    // shouldComponentUpdate(nextProps){
    //     return this.state.genreChosen !== nextProps.location.hash
    // }
    //
    // async componentDidUpdate(props) {
    //     await this.setState({genreChosen: props.location.hash})
    //     this.componentWillMount()
    // }

    render(){
        return (
            <div>
                <Header/>
                <h1>GENRES</h1>
                {
                    this.state.loading === true?
                        <h2>Loading Movies...</h2>:
                        <MovieList movies={this.state.movies}/>
                }


            </div>
        )
    }


}


