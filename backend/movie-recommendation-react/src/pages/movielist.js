import React, {Component} from "react";
import {
    Card, CardImg, CardDeck,
} from 'react-bootstrap';
import styles from "./../App.css"
import Rating from "./rating";
import {Link} from "react-router-dom";
import firebase from "firebase";
import {auth} from "../services/firebase";
import WatchLaterButton from "./watchlaterbutton";


const MovieList = (props) => {

      function handleClick(id) {
        console.log(id)
        // docRef.where('name',"==", this.state.name).limit(1).get().then(snapshot => {
        //     if (snapshot.empty) {
        //         this.docRef.add({
        //             name:id
        //         })
        //     }
        // })

        this.docRef.add({name:id})
    }
    return (
        <div style={{marginTop: 20, marginBottom: 20, width: "100%",styles}}>
        <div className="row">
        {props.movies.map((movie, index) => (
            <CardDeck className = "movie-card">
                <div>
                    <Card className="center">
                        <CardImg className="image" src={"https://image.tmdb.org/t/p/w500/"+movie.poster_path} alt='movie'/>
                        <Card.Body className="details">
                            <Card.Title style={{fontSize:15}}>{movie.title}</Card.Title>
                            <Card.Subtitle style={{fontSize:12}} className="mb-2 text-muted">{movie.release_date}</Card.Subtitle>
                            <Card.Text className="truncate">{movie.overview}</Card.Text>
                            <Rating name = {movie.id} />
                            <Link to={{pathname:'/movie_details' ,state:{movie:movie.id}}}>View Details</Link>
                            <WatchLaterButton movie={movie.id}/>
                        </Card.Body>

                    </Card>
                </div>
            </CardDeck>
        ))}
        </div>
        </div>
    )
}


export default MovieList;