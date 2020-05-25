import React from 'react'
import {connect} from "react-redux"
import axios from 'axios'
import {Link} from 'react-router-dom'
//import {setUp, setUpFunctions, setUpWindowFunctions} from "../../assets/javascripts/audio-player";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // const csrfToken = document.querySelector('[name=csrf-token]').content;
        //axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
        const {email, password} = this.state;
        axios.post('http://localhost:3000/login', {
            user: {
                email: email,
                password: password
            }
        }, {withCredentials: true})
            .then(response => {
                if (response.data.logged_in) {
                    this.props.handleLogin(response.data)
                    this.redirect()
                    console.log("redirecting");
                   //setUp();
                   //setUpFunctions();
                   //setUpWindowFunctions(window);
                } else {
                    this.setState({
                        errors: response.data.errors
                    })
                }
            })
            .catch(error => {
                    console.log('api errors:', error);
                }
            )
    }

    redirect = () => {
        this.props.history.push('/')
    }
    //redirect = () => {
    //    this.props.history.push('/')
    //};
    //handleErrors = () => {
    //    return (
    //        <div>
    //            <ul>
    //                {this.state.errors.map(error => {
    //                    return <li key={error}>{error}</li>
    //                })}hello
    //            </ul>hello
    //        </div>hello
    //    )hello
    //};
    render() {
        const {email, password} = this.state;
        return (
            <div className='LoginBox'>
                <form onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <input
                        className="EmailBox"
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />

                    <label>Password</label>
                    <input
                        className="EmailBox"
                        type="text"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}

                    />
                    <button type="submit">
                        Log in
                    </button>
                </form>
            </div>
        );
    }
}

export default Login;