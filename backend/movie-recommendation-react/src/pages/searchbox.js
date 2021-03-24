import React from "react";
import {MDBCol, MDBIcon} from "mdbreact";
import styles from "./../App.css"

const SearchBox = (props) => {
    return (

        // <MDBCol md="6">
        //     <form action="" onSubmit={props.handleSubmit}>
        //       <div className="active-pink-3 active-pink-4 mb-4">
        //         <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={props.handleChange} />
        //       </div>
        //     </form>
        // </MDBCol>
        <MDBCol md="6" className="search_container">
            <form className="form-inline mt-4 mb-4" action="" onSubmit={props.handleSubmit}>
                <input className="search_input" type="text" placeholder="Search" aria-label="Search" onChange={props.handleChange} />
            </form>
        </MDBCol>

        // <div className="container">
        //     <div className="row">
        //         <section className="col s4 offset-s4">
        //             <form action="" onSubmit={props.handleSubmit}>
        //                 <div className="input field">
        //                     <input placeholder="Search Movie" type="text" onChange={props.handleChange}/>
        //                 </div>
        //             </form>
        //         </section>
        //     </div>
        //
        // </div>
    )
}

export default SearchBox;