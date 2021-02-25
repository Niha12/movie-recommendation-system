import React, {Component} from "react";
import Header from "../components/header";
import MovieList from "./movielist";
import firebase from "firebase";
import {auth} from "../services/firebase";

export default class Recommendations extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies:[],
            uuid : auth().currentUser.uid,
            loading:true
        }
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'
        this.docRef =firebase.firestore().collection("Users")
                .doc(this.state.uuid).collection("Ratings")
        this.tmdbIds=[]

    }

    setTmdbIds() {
        console.log("Ratings;")
        let localtmdbIds = []
        this.docRef.where('rating', "==", 5).get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data().name)
                localtmdbIds.push(doc.data().name)
                // this.setState({tmdbIds:this.state.tmdbIds + doc.data().name})
            })


        })

        this.docRef.where('rating', "==", 4).get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data().name)
                localtmdbIds.push(doc.data().name)
                // this.setState({tmdbIds:this.state.tmdbIds + doc.data().name})
            })


        })
        console.log(localtmdbIds)

        // this.setState({tmdbIds:localtmdbIds}, function(){
        //             console.log("ids: " + this.state.tmdbIds)
        //             this.getRecommendations()
        //         }
        //
        //     )

        return this.pickIds(localtmdbIds)

        // console.log("Hereee: " +this.tmdbIds)



        // console.log(this.state.tmdbIds)


    }

    pickIds(localtmdbIds){

        // if(this.state.tmdbIds.length < 10){
        //     return this.state.tmdbIds
        // }else if (this.state.tmdbIds.length > 10 && this.state.tmdbIds.length > 30 ){
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
        console.log("In Pick:: " + localtmdbIds)
        if(localtmdbIds.length < 10){
            return this.tmdbIds
        }else if (localtmdbIds.length > 10 && localtmdbIds.length > 30 ){

            return localtmdbIds.slice(0, 10).map(function () {
                return this.splice(Math.floor(Math.random() * localtmdbIds.length), 1)[0];
            }, localtmdbIds.slice())

        }else{
            return localtmdbIds.slice(0, 20).map(function () {
                return this.splice(Math.floor(Math.random() * localtmdbIds.length), 1)[0];
            }, localtmdbIds.slice())
        }

    }

    getRecommendations(results) {
        console.log("getRecom Ids: " + results)
        // let results = this.pickIds()

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
            body: JSON.stringify({'tmdbId':[99861]})
        }).then(response => response.json())
            .then(
                json => {
                    this.setState(this.fetchSuggestions([...json.results]))
                    console.log(...json.results)
                    // console.log("ids: "+this.state.tmdbIds)
                }
            )
            .catch(err => console.error(err))

        this.setState({loading: false})

    }

    fetchSuggestions = (results) => {
        console.log("results: " + results)
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

        Promise.all(pushes).then(()=>{
            console.log(recommendations)
            let newrecommendations = []
            for (let item in recommendations){
                // console.log(item)
                // console.log(recommendations[item])
                if (!("success" in recommendations[item])){
                    newrecommendations.push(recommendations[item])
                    console.log(newrecommendations)
                }
            }
            this.setState({movies:newrecommendations})

        })
    }
    componentWillMount() {
        let results = this.setTmdbIds()
        console.log("In Component: "+results)
        this.getRecommendations(results)
    }

    render() {
        return this.state.loading === true ? <h2>Generating your recommendations...</h2> : (
            <div>
                <Header/>
                <MovieList movies={this.state.movies}/>
            </div>
        )
    }

}