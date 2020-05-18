import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import VibinLogo from '../../assets/images/Vibin.png';
import ExploreLogo from '../../assets/images/explore.png';
import GroupiesLogo from '../../assets/images/groupies.png';
import Login from './Login';

const mapStateToProps = state => {
    return {  };
};

//const LoginBox = {
  //  <div className="dropdown-content-login">

    //</div>
//}

const divStyle = {
    height: "100px",
    width: "100px",
    backgroundcolor: "red"
}

function openLogin() {
    var loginBox = document.getElementById('dropdown-content-login');
    loginBox.style.display = 'block';
    return 0;
}

function handleSubmit(event){

}

const Nav = () => (
    <nav>
    <Link to="/"> <img src={VibinLogo} className="VibinTab" alt="home" /></Link>
    <Link to="/explore"> <img src={ExploreLogo} className="ExploreTab" alt="explore"/></Link>
    <Link to="/groupies"><img src={GroupiesLogo} className="GroupiesTab" alt="groupies"/></Link>
        <div className="Login" onMouseOver={openLogin} id="login">Login
            <div className="Dropdown-content-login" id='dropdown-content-login'>
                <Link to="/login">Log in</Link>
            </div>
        </div>
    </nav>
);

const NavBar = connect(mapStateToProps)(Nav);

export default NavBar;