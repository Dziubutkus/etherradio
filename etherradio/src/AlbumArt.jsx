import React, { Component } from "react";
import albumCover from "./media/vultures.png";
// We almost just want this to be passed in a image object or url and then send out an http request to 
// go retreve and render. In the encap player component. 
const styles = {
    center: {
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
class AlbumArt extends Component {

    render() {
        const { image } = this.props;
        console.log(image);
        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <img id="cover-art" src={albumCover} alt="album cover art"></img>
            </div>
            
        )
    }
}

export default AlbumArt;