import {auth} from "../services/firebase";
import React from "react";

// Logout component that is on the header
const Logout = () => {
    function onClick(){
        auth().signOut().then(r => window.location.reload())

    }
    return(
        <button className="btn btn-primary" style={{backgroundColor:"#2b6777"}} onClick={()=>onClick()}>Logout</button>

    )
}

export default Logout;