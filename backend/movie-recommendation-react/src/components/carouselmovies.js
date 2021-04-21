import React from "react";
import Carousel from "react-elastic-carousel";
import {Card, CardDeck, CardImg} from "react-bootstrap";
import styles from "./../App.css"
import Rating from "./rating";
import { Link } from 'react-router-dom';
import image from "./../images/no-image-found.png"
import WatchLaterButton from "./watchlaterbutton";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 3, itemsToScroll: 2 },
  { width: 768, itemsToShow: 5, itemsToScroll: 3  }
];

const CarouselMovies = (props) => {
    const carouselRef = React.useRef(null);
    const onNextStart = (currentItem, nextItem) => {
      if (currentItem.index === nextItem.index) {
        carouselRef.current.goTo(0);
      }
    };
    const onPrevStart = (currentItem, nextItem) => {
      if (currentItem.index === nextItem.index) {
        carouselRef.current.goTo(props.movies.length);
      }
    };

    return(
        <div className = "row" style={{width:"100%",styles}}>
            <Carousel breakPoints={breakPoints} isRTL={false} className="rec-carousel-item" disableArrowsOnEnd={false} ref={carouselRef} onPrevStart={onPrevStart} onNextStart={onNextStart}>
                    {props.movies.map((movie) => (
                        <CardDeck className = "movie-card" style={{height:"300px"}}>
                        <div className="div2">
                            <Card className="center">
                                {
                                    movie.poster_path !== null ?

                                    <CardImg className="image" src={"https://image.tmdb.org/t/p/w500/"+movie.poster_path} alt='movie'/>
                                    :
                                    <CardImg className="image" src={image} alt='movie'/>
                                }
                                <Card.Body className="details">
                                    <Card.Title className="ellipsis-title">{movie.title}</Card.Title>
                                    <Card.Subtitle style={{fontSize:12}} className="mb-2 text-muted">{movie.release_date}</Card.Subtitle>
                                    <Card.Text className="ellipsis">{movie.overview}</Card.Text>
                                    <Rating onChange={props.onChange} name = {movie.id} year={movie.release_date} genres={movie.genres} />
                                    <p style={{fontSize:"12px", color:"red"}}>Average: {(Math.round(movie.vote_average * 10) / 10)/2}/5</p>
                                    <Link to={{pathname:'/movie_details/'+movie.id ,state:{movie:movie.id}}}>View Details</Link>
                                    <WatchLaterButton movie={movie.id}/>
                                </Card.Body>

                            </Card>

                        </div>
                        </CardDeck>
                    ))}

            </Carousel>
        </div>
    )
}

export default CarouselMovies;