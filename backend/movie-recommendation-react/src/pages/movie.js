import React from "react"

const Movie = (props) => {
    return(
        <div className = "col s12 m6 l3">
            <div className = "card">
                <div className ="card-image waves-effect waves-block waves-light">
                    {
                        props.image = null ?
                            <img src={"default image url"}   alt = "card image" width = "30" height = "360" />

                            :

                            <img src={"https://image.tmdb.org/t/p/w500/"+props.image}   alt = "card image" width = "50" height = "360" />


                    }
                </div>
            </div>
        </div>
    )

}

export default Movie;