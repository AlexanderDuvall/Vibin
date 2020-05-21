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


    class NonUserHomePage extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
        handleResizedScreen = () => {
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight
            });
            //console.log(this.state.width);
        };
        componentDidMount() {
            window.addEventListener('resize', this.handleResizedScreen);
        }


        render(){
            return (
                <div className="Non-UserHomePage" id="home" name="non-UserHomePage">
                    <div className="LeftSide">
                        <div className="TopBroadcast">
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
        }
    }


export default NonUserHomePage;