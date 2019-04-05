import React, { Component } from 'react';
import './App.css';
import apiClass from './Api';
import Login from './Login';
import User from './User';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
      },
      isLogged: false,
      text: '',
    };
  }

  handleLogin = () => {
    return;
  }

  handleLogout = () => {
    this.setState({
      username: '',
      email: '',
      password: '',
      isLogged: false,
      text: '',
    })
  }

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
    console.log(this.state.username);
  }

  handleUsername = (e) => {
      this.setState({
        username: e.target.value,
      });
  }

  handlePassword = (e) => {
      this.setState({
        password: e.target.value,
      });
  }

  handleCreate = async () => {
    await this.createUser();
  }

  createUser = async () => {
    let { email, username, password } = this.state;
    let res = await apiClass.createUser(username, email, password);
    console.log(res);
  }
  render() {
    let box = this.state.isLogged === true
              ? <User />
              : <Login
                username={this.state.username}
                handleUsername={this.handleUsername}
                password={this.state.password}
                handlePassword={this.handlePassword}
                email={this.state.email}
                handleEmail={this.handleEmail}
                text={this.state.text}
                handleLogin={this.handleLogin}
                handleCreate={this.handleCreate}
                />;
    return (box);
  }
}

export default App;