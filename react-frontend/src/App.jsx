import React, { Component } from 'react';
import Auth from './components/Auth';
import Home from './components/Home';
import './styles/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    let user = localStorage.getItem('user') || '{}';
    user = JSON.parse(user);
    this.state = {
      user
    }
    this.logInOrOut = this.logInOrOut.bind(this);
  }

  logInOrOut(user, logout=false) {
    this.setState({ user });

    if (logout) {
      localStorage.removeItem('user')
    } else {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  render() {
    const { user } = this.state;
    const welcomeComponent = user.token ? <Home logout={this.logInOrOut} user={user} /> : <Auth login={this.logInOrOut}/>;
    return (
      <div className="App">
        {welcomeComponent}
      </div>
    )
  }
}

export default App;
