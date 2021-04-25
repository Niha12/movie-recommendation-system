import React from "react";
import {MDBCol} from "mdbreact";


// Search box for the main page
const SearchBox = (props) => {
    return (

        <MDBCol md="6" className="search_container">
            <form className="form-inline mt-4 mb-4" action="" onSubmit={props.handleSubmit}>
                <input className="search_input" type="text" placeholder="Search" aria-label="Search" onChange={props.handleChange} />
            </form>
        </MDBCol>
    )
}

export default SearchBox;