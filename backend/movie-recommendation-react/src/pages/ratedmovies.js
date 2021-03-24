import {Component} from "react";
import Header from "../components/header";
import firebase from "firebase";
import {auth} from "../services/firebase";
import MovieList from "./movielist";

export default class MoviesRated extends Component {

    constructor() {
        super();
        this.state={
            uuid: auth().currentUser.uid,
            tmdbIds:[],
            movies:[]
        }
        this.docRef = firebase.firestore().collection("Users")
            .doc(this.state.uuid).collection("Ratings")
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'
    }

    getRatedMovies = (tmdbIds) => {
        let movies = [];
        const pushes = [];
        for (let item in tmdbIds){
            console.log(item)
            const url = 'https://api.themoviedb.org/3/movie/' + tmdbIds[item] + '?api_key=' + this.apiKey + '&language=en-US'
            pushes.push(
                fetch(url).then(response => response.json())
                    .then(json =>

                        movies.push(json)

                    )
                    .catch(err => console.error(err))
            )

        }

        Promise.all(pushes).then(()=>{
            this.setState({movies:movies})
        })
    }


    async componentDidMount() {
        let localtmdbIds = []
        await this.docRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                localtmdbIds.push(doc.data().name)
            })
        })
        this.setState({tmdbIds: localtmdbIds})
        this.getRatedMovies(localtmdbIds)
    }

    render(){
        return(
            <div>
                <Header/>
                <h1 className="heading">Movies You've Rated</h1>
                <MovieList movies={this.state.movies}/>
            </div>
        )
    }

}