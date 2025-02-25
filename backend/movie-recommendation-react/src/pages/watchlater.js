import {Component} from "react";
import MovieList from "../components/movielist";
import firebase from "firebase";
import Header from "../components/header";
import {auth} from "../services/firebase";
import Footer from "../components/footer";

// Displays movies saved by the user
export default class WatchLater extends Component {
    constructor(){
        super();
        this.state = {
            tmdbIds: [],
            movies: [],
            uuid:auth().currentUser.uid
        }
        this.docRef =firebase.firestore().collection("Users")
                .doc(this.state.uuid).collection("WatchLater")
        this.apiKey = process.env.REACT_APP_TMDB_API_KEY
    }

    getWatchLaterMovies = (tmdbIds) => {
        let movies = [];
        const pushes = [];
        for (let item in tmdbIds){
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
        this.getWatchLaterMovies(localtmdbIds)
    }

    render() {
        return(
            <div>
                <Header/>
                <h1 className="heading">Watch Later</h1>
                <MovieList movies={this.state.movies} isWatchLater={true}/>
            </div>
        )
    }


}