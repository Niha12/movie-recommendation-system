import React from "react";
import Movie from "./movie"
import {
    Card, CardImg, Button, CardDeck,
} from 'react-bootstrap';
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import styles from "./../App.css"

// const MovieList = (props) => {
//     // return(
//     //     <div className = "container">
//     //         <div className = "row">
//     //             <div className ="col s12">
//     //                 {props.movies.map((movie,i) => {
//     //                     return (
//     //                         <Movie key = {i} image = {movie.poster_path} />
//     //                     )
//     //                 })}
//     //             </div>
//     //         </div>
//     //     </div>
//     // )
//
//     return(
//         <div className="container">
//             <div className = "row">
//                 <div className = "col s12">
//                     <div className="col s12 m6 l3">
//                         {props.movies.map((movie, index) => (
//                                 <div className='image-container d-flex justify-content-start m-3'>
//                                     <img src={"https://image.tmdb.org/t/p/w500/"+movie.poster_path} alt='movie' width="50" height="100"/>
//                                     <div className='overlay d-flex align-items-center justify-content-center'>
//                                         Add to Favourites
//                                     </div>
//                                 </div>
//                             ))
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }





const MovieList = (props) => {
    return(
        <div style={{marginTop: 20, marginBottom: 20, width: "100%",styles}}>
        <div className="row">
        <CardDeck>
            {props.movies.map((movie, index) => (
                <div className = "col-sm-3">
                    <Card>
                        <CardImg top width="200" src={"https://image.tmdb.org/t/p/w500/"+movie.poster_path} alt='movie'/>
                        {/*<div className="image-overlay"></div>*/}
                        <Card.Body>
                          <Card.Title tag="h5">{movie.title}</Card.Title>
                          <Card.Subtitle tag="h6" className="mb-2 text-muted">{movie.release_date}</Card.Subtitle>
                          <Card.Text>{movie.overview}</Card.Text>
                          <Button>Button</Button>
                        </Card.Body>

                    </Card>
                    </div>
            ))}

        </CardDeck>
        </div>
        </div>

    )
}
                // <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />


export default MovieList;