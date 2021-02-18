import React from "react";
import {
    Card, CardImg, CardDeck,
} from 'react-bootstrap';
import styles from "./../App.css"
import Rating from "./rating";

const MovieList = (props) => {
    return(
        <div style={{marginTop: 20, marginBottom: 20, width: "100%",styles}}>
        <div className="row">
        <CardDeck>
            {props.movies.map((movie, index) => (
                <div className = "col-sm-3">
                    <Card>
                        <CardImg top width="200" src={"https://image.tmdb.org/t/p/w500/"+movie.poster_path} alt='movie'/>
                        <Card.Body>
                          <Card.Title tag="h5">{movie.title}</Card.Title>
                          <Card.Subtitle tag="h6" className="mb-2 text-muted">{movie.release_date}</Card.Subtitle>
                          <Card.Text>{movie.overview}</Card.Text>
                          <Rating name = {movie.id}/>
                        </Card.Body>
                    </Card>
                    </div>
            ))}

        </CardDeck>
        </div>
        </div>

    )
}


export default MovieList;