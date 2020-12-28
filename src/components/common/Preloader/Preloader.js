import React from "react";
import loadPhoto from "../../../assets/images/loader.gif";

let Preloader = (props) => {
    return <div>
            <img height="40" src={loadPhoto}/>
        </div>
}

export default Preloader;