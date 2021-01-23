import React from "react";
import { MDBCol } from "mdbreact";

const SearchBox = (props) => {
    return (

        <MDBCol md="6">
            <form action="" onSubmit={props.handleSubmit}>
              <div className="active-pink-3 active-pink-4 mb-4">
                <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={props.handleChange} />
              </div>
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