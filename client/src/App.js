import React, { Component } from 'react';
import './App.css';
import apiClass from './Api';
import Login from './Login';
import User from './User';
import { deviceDetect } from 'react-device-detect';
/*
  To-Do:
  1. Refactor code
  2. Implement bcrypt
  3. Implement PixiJS with hooks to its features
  4. Error if user is registered already
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
    let user;
    if (email && password) {
      user = await apiClass.getUser(email, password, deviceDetect());
    }
    console.log(user);
    if (user.err) {
      this.setState({
        text: user.err,
      });
      setTimeout(() => {
        this.setState({
          text: '',
        })
      }, 5000);
      return;
    }
    if (user) {
      await apiClass.getHistory(user._id)
        .then(data => {
          user.data = data;
          this.setState({
            user: user,
            isLogged: true,
          });
        }).catch(err => console.log(err));
      console.log(this.state.user);
    }
  }

  handleLogout = async () => {
    await this.setState({
      username: '',
      email: '',
      password: '',
      isLogged: false,
      text: 'Вы успешно вышли.',
    })
  }

  handleEmail = (e) => {
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

  handleReset = async () => {
    return;
  }

  setPassword = (value) => {
    this.setState({
        password: value,
    });
  }

  setText = (value) => {
    this.setState({
      text: value,
    })
  }
  handleCreate = async () => {
    let { email, username, password } = this.state;
    if (email === '' || username=== '' || password === '') {
      this.setState({
        text: 'Введите данные',
      });
      setTimeout(() => this.setState({
        text: '',
      }), 5000);
      return;
    }
    await apiClass.createUser(username, email, password, deviceDetect())
    .then(res => {
      if (res.status !== 403) {
        this.setState({
          user: res,
          isLogged: true,
        });
      } else {
        this.setState({
          text: 'Пользователь зарегестрирован. Воспользуйтесь входом.'
        });
        setTimeout(() => this.setState({
          text: '',
        }), 5000);
      }})
    .catch( () => {
      this.setState({
        text: 'Ошибка.'
      });
      setTimeout(() => this.setState({
        text: '',
      }), 5000);
    })
  }

  render() {
    let box = this.state.isLogged === true
              ? <User
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                    setPassword={this.setPassword}
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
                    handleReset={this.handleReset}
                    setPassword={this.setPassword}
                    setText={this.setText}
                />;
    console.log(deviceDetect());

    return (box);
  }
}

export default App;