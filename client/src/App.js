import React, { Component } from 'react';
import './App.css';
import apiClass from './Api';
import Login from './Login';
import User from './User';

/*
  To-Do:
  1. Refactor code
  2. Implement bcrypt
  3. Implement PixiJS with hooks to its features
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: '',
      email: 'admin@admin.com',
      password: '12345',
      isLogged: false,
      text: '',
    };
  }

  handleLogin = async () => {
    let { email, password } = this.state;
    let user = await apiClass.getUser(email, password);
    if (user) {
      this.setState({
        user: user,
        isLogged: true,
      });
    }
  }

  handleLogout = async () => {
    await this.setState({
      username: '',
      email: '',
      password: '',
      isLogged: false,
      text: '',
    })
  }

  handleEmail = (e) => {
    console.log(e.target.value);
    this.setState({
      email: e.target.value,
    });
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
    if (res) {
      this.setState({
        user: res,
        isLogged: true,
      })
    }
  }

  render() {
    let box = this.state.isLogged === true
              ? <User
                    user={this.state.user}
                />
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