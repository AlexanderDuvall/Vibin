import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {  };
};

const Explore = () => (
    <div>
    <p>Explore Page</p>
</div>

);

const ExplorePage = connect(mapStateToProps)(Explore);

export default ExplorePage;