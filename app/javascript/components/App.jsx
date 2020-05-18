import React from 'react'
import {Provider} from 'react-redux'
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import NavBar from "./NavBar"
import './App.css'
import configureStore from "../configureStore"
import NonUserHomePage from "./NonUserHomePage"
import GroupiesPage from "./GroupiesPage"
import ExplorePage from './ExplorePage'
import Login from './Login'


const store = configureStore();
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {}
        };
    }

    handleLogin = (data) => {
        this.setState({
            isLoggedIn: true,
            user: data.user
        })
    }

    handleLogout = () => {
        this.setState({
            isLoggedIn: false,
            user: {}
        })
    }

    componentDidMount() {
        this.loginStatus()
    }

    loginStatus = () => {
        axios.get('http://localhost:3000/logged_in',
            {withCredentials: true})
            .then(response => {
                if (response.data.logged_in) {
                    this.handleLogin(response)
                } else {
                    this.handleLogout()
                }
            })
            .catch(error => console.log('api errors: ', error))
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <NavBar/>
                    <Switch>
                        <Route exact path="/" render={props =>
                            (<NonUserHomePage{...props}
                                             loggedInStatus={this.state.isLoggedIn}/>)}/>
                        <Route path="/explore" render={() => <ExplorePage/>}/>
                        <Route path="/groupies" render={() => <GroupiesPage/>}/>
                        <Route
                            path='/login'
                            render={props => (
                                <Login {...props} handleLogin={this.handleLogin}
                                       loggedInStatus={this.state.isLoggedIn}/>
                            )}
                        />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}
export default App;