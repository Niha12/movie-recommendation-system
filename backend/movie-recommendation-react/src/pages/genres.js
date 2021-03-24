import {Component} from "react";
import Header from "../components/header";
import MovieList from "./movielist";

export default class Genres extends Component {
    constructor(props){
        super(props);
        this.state={
            genres:[{"id":28,"name":"Action"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":10751,"name":"Family"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science-Fiction"},{"id":53,"name":"Thriller"}],
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

    async componentDidMount() {
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

    // shouldComponentUpdate(nextProps){
    //     return this.state.genreChosen !== nextProps.location.hash
    // }

    async componentDidUpdate(prevProps, prevState) {
        console.log("prev props: "+prevProps.location.hash)
        console.log("this props genre: "+this.props.location.hash)
        if(this.props.location.hash !== prevProps.location.hash){
            await this.setState({genreChosen: this.props.location.hash})
            this.componentDidMount()
        }

    }

    render(){
        return (
            <div>
                <Header/>
                <h1 className="heading">{this.state.genreChosen.split('#')[1]} movies</h1>
                {
                    this.state.loading === true?
                        <h2>Loading Movies...</h2>:
                        <MovieList movies={this.state.movies}/>
                }


            </div>
        )
    }


}


