import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            email: '',
            password: '',
            errors: ''
        };
    }

  //handleChange(e) {
  //    console.log("xxxx")
  //    const {name, value} = e.target;
  //    this.setState({
  //        [name]: value
  //    })
  //}

  //handleSubmit = (event) => {
  //    event.preventDefault();
  //    const {email, password} = this.state;
  //    let user = {
  //        email: email,
  //        password: password
  //    };

  //    axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
  //        .then(response => {
  //            if (response.data.logged_in) {
  //                this.props.handleLogin(response.data);
  //                this.redirect()
  //            } else {
  //                this.setState({
  //                    errors: response.data.errors
  //                })
  //            }
  //        }) 
  //        .catch(error => console.log('api errors:', error))
  //};
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
            <h1>hello, gdhhh Edward</h1>
           // <div className='LoginBox'>
           //     <h1>Log In</h1>
           //     <form onSubmit={this.handleSubmit}>
           //         <label>Email</label>
           //         <input
           //             className="EmailBox"
           //             type="text"
           //             name="email"
           //             value={email}
           //             onChange={this.handleChange}
           //         />
            //
           //         <label>Password</label>
           //         <input
           //             className="EmailBox"
           //             type="text"
           //             name="password"
           //             value={this.handleChange()}
           //         />
           //         <button placeholder="submit" type="submit">
           //             Log in
           //         </button>
           //     </form>
           // </div>
        );
    }
}

export default Login;