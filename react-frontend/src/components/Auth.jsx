

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVoteYea } from '@fortawesome/free-solid-svg-icons';
import userData from '../data/userData';
import '../styles/App.scss';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(event) {
    this.setState({ error: false });
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  login(event) {
    event.preventDefault();
    this.setState({ error: false });

    const { login } = this.props;
    const { email, password } = this.state;
    const user = userData[email];
    if (user) {
      if(user.password === password) {
        user.email = email;
        login(user);
      } else {
        this.setState({ error: true });
      }
    } else {
      this.setState({ error: true });
    }
    // TODO: make real API call to login
  }

  render() {
    const { error } = this.state;
    const inputClass = error ? 'error' : '';
    return (
      <div className="auth">
        <div className="welcome">
          {/* TODO: add animation background */}
          <h1>DIGIVOTE</h1>
          <FontAwesomeIcon icon={faVoteYea} className="vote-icon"/>
        </div>
        
        <div className="login-form">
          { error && <p>Sorry, we couldn't identify you ...</p>}
          <input className={inputClass} type="text" name="email" placeholder="Email" required onChange={this.handleChange}/>
          <input className={inputClass} type="password" name="password" placeholder="Password please ..." required  onChange={this.handleChange}/>
          <button onClick={this.login}>Login</button>
        </div>
      </div>
    )
  }
}

export default Auth;
