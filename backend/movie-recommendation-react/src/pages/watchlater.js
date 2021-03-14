import {Component} from "react";
import MovieList from "./movielist";
import firebase from "firebase";
import Header from "../components/header";
import {auth} from "../services/firebase";

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
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'
    }

    getWatchLaterTMDBIds = async () => {
    }

    getWatchLaterMovies = (tmdbIds) => {
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

    async componentWillMount() {
        let localtmdbIds = []
        await this.docRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                localtmdbIds.push(doc.data().name)
            })
        })
        // this.setState({tmdbIds: localtmdbIds})
        // this.getWatchLaterTMDBIds().then(() => this.getWatchLaterMovies())
        this.getWatchLaterMovies(localtmdbIds)
    }

    render() {
        return(
            <div>
                <Header/>
                <MovieList movies={this.state.movies}/>
            </div>
        )
    }


}