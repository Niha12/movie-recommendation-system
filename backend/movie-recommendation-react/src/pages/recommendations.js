import React, {Component} from "react";
import Header from "../components/header";
import MovieList from "../components/movielist";
import firebase from "firebase";
import {auth} from "../services/firebase";
import {DropdownButton, Dropdown} from "react-bootstrap";
import Footer from "../components/footer";

export default class Recommendations extends Component {

    constructor(){
        super();
        this.onClick = this.onClick.bind(this)
        this.state = {
            movies:[],
            uuid : auth().currentUser.uid,
            email : auth().currentUser.email,
            loading:true,
            tmdbIds:[],
            friends:[],
            name:"yours"
        }
        this.apiKey = '0e4224cc4fec38376b7e3f8f073a68c6'
        this.docRefUsers =firebase.firestore().collection("Users")
        this.docRefuuid = this.docRefUsers.doc(this.state.uuid)
        this.docRef = this.docRefuuid.collection("Ratings")
    }

    pickIds = (localtmdbIds) => {
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

    getRecommendations = (results, allIds) => {
        let bakendUrl = "/backend"
        let backendAPIToken = "Token " + localStorage.getItem("token")
        fetch(bakendUrl + "/suggestions", {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': backendAPIToken
            },
            body: JSON.stringify({'tmdbId':results,'allIds':allIds,'isUpdate':"false"})
        }).then(response => response.json())
            .then(
                json => {
                    this.setState(this.fetchSuggestions([...json.results]))
                }
            )
            .catch(err => console.error(err))

    }

    fetchSuggestions = async (results) => {
        let recommendations = [];
        const pushes = [];
        for (let item in results) {
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
        Promise.all(pushes).then(() => {
            for (let item in recommendations) {
                if (!("success" in recommendations[item])) {
                    newrecommendations.push(recommendations[item])
                }
            }
            this.setState({movies: newrecommendations})
        })


        await this.setState({loading: false})
    }
    async componentWillMount() {
        let localtmdbIds = []
        let allIds = []
        let arr = []

        for (let i = 0; i <=5; i++){
            await this.docRef.where('rating', "==", i).get().then(snapshot => {
                snapshot.forEach(doc => {
                    if (i === 4 || i === 5){
                        localtmdbIds.push(doc.data().name)
                    }
                    allIds.push(doc.data().name)
                })

            })
        }

        arr.push({email:"yours",ids:localtmdbIds})

        let localFriendsEmails = ["yours"]
		await this.docRefuuid.collection("Friends").get().then(snapshot => {
			snapshot.forEach(doc =>{
			    if (doc.data().accepted){
			        localFriendsEmails.push(doc.data().email)
                }
			})


		})

        await this.setState({friends:localFriendsEmails})

        for (let i = 1; i < localFriendsEmails.length; i++){
            let ids =[]
            let id = ""

            await this.docRefUsers.where('email','==', localFriendsEmails[i]).get().then(snapshot =>{
                snapshot.forEach(function(doc) {
                    console.log(doc.id)
                    id = doc.id

                })
            })

            await this.docRefUsers.doc(id).collection("Ratings").where('rating', "==", 5).get().then(snapshot => {

                    snapshot.forEach(doc => {
                        ids.push(doc.data().name)
                    })
            })

            await this.docRefUsers.doc(id).collection("Ratings").where('rating', "==", 4).get().then(snapshot => {

                    snapshot.forEach(doc => {
                        ids.push(doc.data().name)
                    })
            })

            let arr1 = {email:localFriendsEmails[i], ids:ids}
            arr.push(arr1)
        }
        await this.setState({tmdbIds:arr})

        let results = this.pickIds(localtmdbIds)
        this.getRecommendations(results, allIds)
    }

    async onClick(user) {

        await this.setState({loading: true, name:user})
        for (let i = 0; i < this.state.tmdbIds.length; i++) {

            if (this.state.tmdbIds[i].email === user) {
                let results = this.pickIds(this.state.tmdbIds[i].ids)
                this.getRecommendations(results)
            }
        }

    }

    render() {

        if (this.state.loading === true){
            return(
                <div>
                    <Header/>
                     <h2>Generating your recommendations...</h2>
                </div>
            )
        }else{
            return(
                <div>
                    <Header/>
                    <h1 className="heading">{this.state.name==="yours"?"Your":this.state.name} Recommendations</h1>
                    <div>
                        <DropdownButton id="dropdown-basic-button" title="Recommendations" onSelect={this.onClick}>
                            {
                                this.state.friends.map((user)=>(
                                    <Dropdown.Item eventKey={user}>{user==="yours"?"Yours":user}</Dropdown.Item>
                                ))
                            }
                        </DropdownButton>
                        <MovieList movies={this.state.movies}/>
                    </div>
                    <Footer/>
                </div>
            )
        }

    }

}