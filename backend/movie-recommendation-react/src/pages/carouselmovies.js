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

 //
 // function addListeners() {
 //        let stars = document.querySelectorAll('.star');
 //        [].forEach.call(stars, function (star, index) {
 //            star.addEventListener('click', (function (idx) {
 //                console.log('adding rating on', index);
 //                document.querySelector('.stars').setAttribute('data-rating', idx + 1);
 //                console.log('Rating is now', idx + 1);
 //                setRating();
 //            }).bind(window, index));
 //        });
 //
 //    }
 //
 //    function setRating1() {
 //        let stars = document.querySelectorAll('.star');
 //        let rating = parseInt(document.querySelector('.stars').getAttribute('data-rating'));
 //        [].forEach.call(stars, function (star, index) {
 //            if (rating > index) {
 //                star.classList.add('rated');
 //                console.log('added rated on', index);
 //            } else {
 //                star.classList.remove('rated');
 //                console.log('removed rated on', index);
 //            }
 //        });
 //    }
 //    function setRating(ev){
 //        console.log("3")
 //            let span = ev.currentTarget;
 //            let stars = document.querySelectorAll('.star');
 //            let match = false;
 //            let num = 0;
 //            stars.forEach(function(star, index){
 //                if(match){
 //                    star.classList.remove('rated');
 //                }else{
 //                    star.classList.add('rated');
 //                }
 //                //are we currently looking at the span that was clicked
 //                if(star === span){
 //                    match = true;
 //                    num = index + 1;
 //                }
 //            });
 //            console.log("4")
 //            document.querySelector('.stars').setAttribute('data-rating', num);
 //        }
 //    function addEventListener() {
 //
 //
 //             console.log("1")
 //            let stars = document.querySelectorAll('.star');
 //            stars.forEach(function(star){
 //                star.addEventListener('click', setRating);
 //            });
 //            console.log("2")
 //            let rating = parseInt(document.querySelector('.stars').getAttribute('data-rating'));
 //            let target = stars[rating - 1];
 //            target.dispatchEvent(new MouseEvent('click'));
 //
 //    }


const CarouselMovies = (props) => {

    return(
        <div className = "row" style={{width:"100%",styles}}>
            <Carousel breakPoints={breakPoints} isRTL={false}>
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