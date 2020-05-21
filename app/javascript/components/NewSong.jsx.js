import React from "react";

class NewSong extends React.Component {
    consolelog(e) {
        e.preventDefault();
        console.log("lmaoooooo");
    }


    render() {
        return (
            <React.Fragment>
                <p>Groupies Page</p>
                <button onClick={this.consolelog}>but</button>
            </React.Fragment>
        );
    }
}

export default NewSong;