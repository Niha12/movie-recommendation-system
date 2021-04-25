import {Component} from "react";
import firebase from "firebase";
import { auth } from "../services/firebase";
import { Button
} from 'react-bootstrap';
import CarouselMovies from "./carouselmovies";

// Displays the movies for preference elicitation
export default class PreferenceElicitation extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this)
        this.state = {
            show: false,
            movies:[],
            tmdbIds:[19995,24428,671,105,259693,419430,250546,177677,297761,13804,10625,284053,496243,416477,597,353486,150540,9806,405774,374720,10528,862,27205,157336,475557,49018,771,8871,508,1581,454983,313369,1726,75656],
            uuid : auth().currentUser.uid,
            disabled:true
        }
        this.docRef =firebase.firestore().collection("Users")
                .doc(this.state.uuid).collection("Ratings")
        this.apiKey = process.env.REACT_APP_TMDB_API_KEY
    }

    // Gets movie data about the tmdbIds set in state
    getMovies = () => {
        let movies = [];
        const pushes = [];

        let shuffled = this.state.tmdbIds
          .map((a) => ({sort: Math.random(), value: a}))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value)

        for (let item in shuffled){
            const url = 'https://api.themoviedb.org/3/movie/' + shuffled[item] + '?api_key=' + this.apiKey + '&language=en-US'
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

    componentDidMount(){
        this.getMovies()
    }

    // Every time a user rated a movie, it checks how many have been rated either a 4 or 5
    async onChange() {
        let num = 0
        await this.docRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().rating === 4 || doc.data().rating === 5) {
                    num = num + 1
                }
            })
        })

        if(num > 2 ) {
            await this.setState({disabled: false})
        }

    }



    render() {
        return (
            <div>
                <h1 className="heading">Rate a few of your favourite movies</h1>
                <CarouselMovies movies={this.state.movies} pref={true} onChange={this.onChange}/>
                <Button style={{align:"center"}} disabled={this.state.disabled} onClick={this.props.refreshPage}>End Ratings</Button>
                <p className="text-info" style={{alignContent:"center", border:"black", marginTop:10, fontSize:18}}>We need you to rate a few movies before we can start generating recommendations for you.</p>
            </div>
        );
    }
}
