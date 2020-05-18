/*import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {  };
};

const Page = () => (
    <div className="Non-UserHomePage" id="home" name="non-UserHomePage">
        <div className="LeftSide">
            <div className="TopBroadcast" id="topBroadcast">
                Top live stream
            </div>
            <div className="Slideshow">
                About Vibin
            </div>
        </div>
        <div className="RightSide" id="rightSide">
            <div className="TopSongs">
                Top songs from the past week
            </div>
            <div className="TopBroadcasts">
                Top streamers from the past week.
            </div>
            <div className="Trending">
                Treading songs. highest plays from the past 3 days
            </div>
            <div className="GenreList">
                select genre then display top songs from the past month.
            </div>
        </div>
    </div>
);

const NonUserHomePage = connect(mapStateToProps)(Page);



 */

import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
const NonUserHomePage = (props) => {
    const handleClick = () => {
        axios.delete('http://localhost:3000/logout', {withCredentials: true})
            .then(response => {
                props.handleLogout()
                props.history.push('/')
            })
            .catch(error => console.log(error))
    }
    return (

        <div>
        <Link to='/login'>Log In</Link>
    <br></br>
    <Link to='/signup'>Sign Up</Link>
    <br></br>
    {
        props.loggedInStatus ?
    <Link to='/logout' onClick={handleClick}>Log Out</Link> :
      null
    }
</div>
);
};
export default NonUserHomePage;