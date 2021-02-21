import React, {Component} from "react";
import Header from "../components/header";
import MovieList from "./movielist";


export default class Recommendations extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies:[]
        }
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'

    }


    getRecommendations() {
        let bakendUrl = "/backend"
        let backendAPIToken = "Token 609c793e6fce5a448e3ef63850b2226cfe043445"
        fetch(bakendUrl + "/suggestions", {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': backendAPIToken
            },
            body: JSON.stringify({'tmdbId':[99861]})
        }).then(response => response.json())
            .then(
                json => {
                    this.setState(this.fetchSuggestions([...json.results]))
                    console.log(...json.results)
                }
            )

            .catch(err => console.error(err))

    }

    fetchSuggestions = (results) => {
        console.log("results: " + results)
        let recommendations = [];
        const pushes = [];
        for (let item in results){
            const url = 'https://api.themoviedb.org/3/movie/' + results[item].tmdbId + '?api_key=' + this.apiKey + '&language=en-US'
            pushes.push(
                fetch(url).then(response => response.json()).then(json => recommendations.push(json))
            )

        }

        Promise.all(pushes).then(()=>{
            this.setState({movies:recommendations})
        })
    }
    componentDidMount() {
        this.getRecommendations()
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