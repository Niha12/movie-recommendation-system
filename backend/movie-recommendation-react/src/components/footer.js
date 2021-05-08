import React from 'react';
import { auth } from '../services/firebase';
// Footer component to be displayed on each page
function Footer(){
    console.log(auth().currentUser)
    if(auth().currentUser) {
        return (
            <div className="footer">
                <hr/>
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text" style={{textAlign:"center"}}>Copyright &copy; 2021 All Rights Reserved by Niha Gummakonda
                        </p>
                    </div>
                </div>
            </div>
        )
    }else{
        return null
    }
}


export default Footer

