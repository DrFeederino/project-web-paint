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
      token: undefined,
      text: '',
    };
  }

  handleLogin = () => {
    let {user, token} = this.fetchUserData();
    this.setState({
      user: user,
      token: token,
      isLogged: true,
    });
  }

  handleLogout = () => {
    this.setState({
      user: {
        username: '',
        email: '',
        password: '',
      },
      isLogged: false,
      token: undefined,
      text: '',
    })
  }

  fetchUserData = async() => {
    let {email, password} = this.state;
    await apiClass.getUser(email, password)
        .then(res => {
          return res;
        })
        .catch(err => {
            this.setState({
                text: err,
            })
        })
  }

  handleReset = () => {
    this.getResetStatus(); 
  }

  getResetStatus = async () => {
    await apiClass.resetPass(this.state.user.email)
      .then(this.setState({
        text: 'Ссылка отправлена на почтовый ящик.'
      })).catch(err => this.setState({
        text: err
      }));
  }

  handleCreate = () => {
    let { user, token } = this.createUser();
    this.setState({
      user: user,
      token: token,
      isLogged: true,
    });
  }

  createUser = async () => {
    let { email, username, password } = this.state.user;
    await apiClass.createUser(username, email, password);
  }
  render() {
    let box = this.state.isLogged === true
              ? <User />
              : <Login
                username={this.state.user.username}
                password={this.state.user.password}
                email={this.state.user.email}
                text={this.state.text}
                handleLogin={this.handleLogin}
                handleReset={this.handleReset}
                handleCreate={this.handleCreate}
                />;
    return (box);
  }
}

export default App;