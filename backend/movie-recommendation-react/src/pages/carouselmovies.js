import React from "react";
import Carousel from "react-elastic-carousel";
import {Button, Card, CardDeck, CardImg} from "react-bootstrap";
import styles from "./../App.css"
import Rating from "./rating";
import { Link } from 'react-router-dom';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 3, itemsToScroll: 3 },
  { width: 768, itemsToShow: 5 },
  { width: 1200, itemsToShow: 7 }
];

const CarouselMovies = (props) => {

    return(
        <div className = "row" style={{width:"100%",styles}}>
            <Carousel breakPoints={breakPoints} isRTL={false} className="rec-carousel-item">
                    {props.movies.map((movie, index) => (
                        // <div style={{marginTop: 20, marginBottom: 20, width: "100%"}}>
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
                                </Card.Body>

                            </Card>

                        </div>
                        </CardDeck>
                        // </div>
                    ))}

            </Carousel>
        </div>
    )
}

export default CarouselMovies;