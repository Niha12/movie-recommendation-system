import React, { Component } from 'react';
import HomePageHeader from "../components/homepage-header";
import Footer from "../components/footer";
import mainPage from "./../images/mainpage.JPG"
import movieDetails from "./../images/moviedetails.JPG"
import {Link} from "react-router-dom";

// Home page prior to logging in - has information about the website
export default class HomePage extends Component {

    render(){
        return(
            <div>
                <HomePageHeader/>
                <div className="div-home">
                    <h1 className="text-center" style={{color:"white", fontSize:"60px", fontFamily:"monospace", textShadow:"-5px -2px 0 #3b4c48, 1px -1px 0 #3b4c48, -1px -2px 0 #3b4c48"}}>MOVIEREC</h1>
                    <p className="text-center" style={{color:"white", fontSize:"30px", fontFamily:"monospace"}}>This website was created for a dissertation project in 2021.</p>
                    <div style={{ display:"flex", flexDirection: "row"}}>
							<Link className="btn btn-primary" style={{backgroundColor:"#2b6777", marginRight:"15px", alignItems:"center"}} to="/signup">Sign Up</Link>
                            <Link className="btn btn-primary" style={{backgroundColor:"#2b6777", alignItems:"center"}} to="/login">Sign In</Link>
                    </div>

                </div>
                <div className="container">
                    <div className="content">
                        <p style={{fontSize:"22px", fontFamily:"auto"}}> MovieRec is a personalised movie recommendation website.
                               You rate movies and they are used to provide reliable recommendations to you. It uses the Item-Based Collaborative Filtering technique
                                to provide recommendations. The movies displayed are using the TMDB API.</p>
                        <div style={{display:"flex", marginTop:"20px"}}>
                            <div  style={{float:"left", height:"50%", width:"90"}}>
                                <img src={mainPage} alt="main-page-display" style={{height:"100%", width:"100%"}}/>
                            </div>
                            <div style={{float:"right"}}>
                                <p style={{fontSize:"22px", textAlign:"center", fontFamily:"monospace", width:"80%", marginLeft:"30px"}}>MovieRec helps you find movies that you are likely to enjoy.
                                   You can rate movies to build your MovieRec profile, then you get recommendations based on
                                  your ratings.</p>
                            </div>
                        </div>
                        <div style={{display:"flex", marginTop:"20px"}}>
                            <div style={{float:"left"}}>
                                <p style={{fontSize:"22px", textAlign:"center", fontFamily:"monospace", width:"80%", marginTop:"30px"}}>You can search for movies by name or even by genre. You can watch the trailer
                                     and find the content link to the movie.</p>
                            </div>
                            <div  style={{float:"right", height:"50%", width:"90", marginLeft:"10px"}}>
                                <img src={movieDetails} alt="main-page-display" style={{height:"100%", width:"100%"}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
