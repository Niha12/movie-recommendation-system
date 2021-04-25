import React from "react";
import {
    Card, CardImg, CardDeck,
} from 'react-bootstrap';
import styles from "./../App.css"
import Rating from "./rating";
import {Link} from "react-router-dom";
import WatchLaterButton from "./watchlaterbutton";
import image from "./../images/no-image-found.png"

// Displays movies in a list for search, recommendations etc
const MovieList = (props) => {

    return (
        <div style={{position:"relative", overflow:"hidden",styles}}>
            <div className="row" style={{paddingLeft:"50px", float:"left"}}>


            {props.movies.map((movie) => (
                <CardDeck className = "movie-card">
                    <div>
                        <Card className="movie-list">
                            {
                                movie.poster_path !== null ?

                                <CardImg className="image" src={"https://image.tmdb.org/t/p/w500/"+movie.poster_path} alt='movie'/>
                                :
                                <CardImg style={{height:"100%", width:"100%",display: "inline-block", overflow: "hidden"}} src={image} alt='movie'/>
                            }
                                <Card.Body className="details">
                                <Card.Title className = "ellipsis-title" style={{fontSize:15}}>{movie.title}</Card.Title>
                                <Card.Subtitle style={{fontSize:12}} className="mb-2 text-muted">{movie.release_date}</Card.Subtitle>
                                <Card.Text className="ellipsis">{movie.overview}</Card.Text>
                                <Rating name = {movie.id} year={movie.release_date} genres={movie.genres}/>
                                <p style={{fontSize:"12px", color:"red"}}>Average rating: {(Math.round(movie.vote_average * 10) / 10)/2}/5</p>
                                <Link to={{pathname:'/movie_details' ,state:{movie:movie.id}}}>View Details</Link>
                                    {
                                        props.isWatchLater === true ?
                                            <WatchLaterButton movie={movie.id} isWatchLater={true}/>:
                                            <WatchLaterButton movie={movie.id} isWatchLater={false}/>
                                    }
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