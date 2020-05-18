import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {  };
};

const Groupies = () => (
    <div>
    <p>Groupies Page</p>
</div>

);

const GroupiesPage = connect(mapStateToProps)(Groupies);

export default GroupiesPage;