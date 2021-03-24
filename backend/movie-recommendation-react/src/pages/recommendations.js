import React, {Component} from "react";
import Header from "../components/header";
import MovieList from "./movielist";
import firebase from "firebase";
import {auth} from "../services/firebase";

export default class Recommendations extends Component {

    constructor(){
        super();
        this.state = {
            movies:[],
            uuid : auth().currentUser.uid,
            loading:true,
            tmdbIds:[]
        }
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'
        this.docRef =firebase.firestore().collection("Users")
                .doc(this.state.uuid).collection("Ratings")
        // this.setTmdbIds()
        // this.pickIds()

    }

    pickIds = (localtmdbIds) => {
        console.log("PickIds")
        // if(this.state.tmdbIds.length < 10){
        //     return this.state.tmdbIds
        // }else if (this.state.tmdbIds.length > 10 && this.state.tmdbIds.length < 30 ){
        //
        //     return this.state.tmdbIds.slice(0, 10).map(function () {
        //         return this.splice(Math.floor(Math.random() * this.state.tmdbIds.length), 1)[0];
        //     }, this.state.tmdbIds.slice())
        //
        // }else{
        //     return this.state.tmdbIds.slice(0, 20).map(function () {
        //         return this.splice(Math.floor(Math.random() * this.state.tmdbIds.length), 1)[0];
        //     }, this.state.tmdbIds.slice())
        // }
        if(localtmdbIds.length < 10){
            return localtmdbIds
        }else if (localtmdbIds.length > 10 && localtmdbIds.length < 30 ){

            return localtmdbIds.slice(0, 10).map(function () {
                return this.splice(Math.floor(Math.random() * localtmdbIds.length), 1)[0];
            }, localtmdbIds.slice())

        }else{
            return localtmdbIds.slice(0, 20).map(function () {
                return this.splice(Math.floor(Math.random() * localtmdbIds.length), 1)[0];
            }, localtmdbIds.slice())
        }

    }

    getRecommendations = (results) => {
        // let results = this.pickIds()

        console.log("getrecom")
        console.log(this.state.tmdbIds)
        // let res = results
        let variab = []
        let bakendUrl = "/backend"
        let backendAPIToken = "Token " + localStorage.getItem("token")
        console.log(backendAPIToken)

        fetch(bakendUrl + "/suggestions", {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': backendAPIToken
            },
            //99861
            body: JSON.stringify({'tmdbId':results,'isUpdate':"false"})
        }).then(response => response.json())
            .then(
                json => {
                    // console.log(results)
                    this.setState(this.fetchSuggestions([...json.results]))
                    console.log(...json.results)
                    // console.log("ids: "+this.state.tmdbIds)
                }
            )
            .catch(err => console.error(err))

    }

    fetchSuggestions = (results) => {
        console.log("results: ")
        console.log(results)
        let recommendations = [];
        const pushes = [];
        for (let item in results){
            const url = 'https://api.themoviedb.org/3/movie/' + results[item].tmdbId + '?api_key=' + this.apiKey + '&language=en-US'
            pushes.push(
                fetch(url).then(response => response.json())
                    .then(json =>

                        recommendations.push(json)

                    )
                    .catch(err => console.error(err))
            )

        }

        let newrecommendations = []
        Promise.all(pushes).then(()=>{
            for (let item in recommendations){
                if (!("success" in recommendations[item])){
                    newrecommendations.push(recommendations[item])
                }
            }
            this.setState({movies:newrecommendations})
        })


        this.setState({loading: false})
    }
    async componentWillMount() {
        let localtmdbIds = []
        await this.docRef.where('rating', "==", 5).get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log("1")
                console.log(doc.data().name)
                console.log(typeof doc.data().name)
                localtmdbIds.push(doc.data().name)
            })


        })

        await this.docRef.where('rating', "==", 4).get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log("2")
                console.log(doc.data().name)
                localtmdbIds.push(doc.data().name)
            })


        })

        let results = this.pickIds(localtmdbIds)
        this.getRecommendations(results)
    }

    render() {

        return(
            <div>
                <Header/>
                {this.state.loading === true ? <h2>Generating your recommendations...</h2> :
                    <MovieList movies={this.state.movies}/>
                }
            </div>
        )
    }

}