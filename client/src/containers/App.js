import React, { Component } from 'react';
import '../styles/app-login.css';
import apiClass from '../components/Api';
import Login from '../components/Login';
import User from '../components/User';
import { deviceDetect } from 'react-device-detect';
import { Helmet } from 'react-helmet';
import ImageEditor from '../components/editor/ImageEditor';
import i18n from 'i18next';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: '',
      email: '',
      password: '',
      isLogged: false,
      text: ''
    };
  }

  handleLogin = async () => {
    let { email, password } = this.state;
    let user;
    if (email && password) {
      user = await apiClass.getUser(email, password, deviceDetect());
    }
    if (user.err) {
      this.setState({
        text: user.err
      });
      setTimeout(() => {
        this.setState({
          text: ''
        });
      }, 5000);
      return;
    }
    if (user) {
      await apiClass
        .getHistory(user._id)
        .then(data => {
          user.data = data;
          this.setState({
            user: user,
            isLogged: true
          });
        })
        .catch(err => console.log(err));
    }
  };

  handleLogout = async () => {
    await this.setState({
      username: '',
      email: '',
      password: '',
      isLogged: false,
      text: 'Вы успешно вышли.'
    });
  };

  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleReset = async () => {
    return;
  };

  setPassword = value => {
    this.setState({
      password: value
    });
  };

  setText = value => {
    this.setState({
      text: value
    });
  };
  handleCreate = async () => {
    let { email, username, password } = this.state;
    if (email === '' || username === '' || password === '') {
      this.setState({
        text: 'Введите данные'
      });
      setTimeout(
        () =>
          this.setState({
            text: ''
          }),
        5000
      );
      return;
    }
    await apiClass
      .createUser(username, email, password, deviceDetect())
      .then(res => {
        if (res.status !== 403) {
          this.setState({
            user: res,
            isLogged: true
          });
        } else {
          this.setState({
            text: 'Пользователь зарегестрирован. Воспользуйтесь входом.'
          });
          setTimeout(
            () =>
              this.setState({
                text: ''
              }),
            5000
          );
        }
      })
      .catch(() => {
        this.setState({
          text: 'Ошибка.'
        });
        setTimeout(
          () =>
            this.setState({
              text: ''
            }),
          5000
        );
      });
  };

  render() {
    const { isLogged, user } = this.state;
    const helmet = (
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="This is an image editor web app in React and Fabric.js. Influenced by salgum1114's React Design Editor."
        />
        <link rel="manifest" href="./manifest.json" />
        <link rel="shortcut icon" href="./favicon.ico" />
        <title>{i18n.t('editor.title')}</title>
      </Helmet>
    );
    const renderApp =
      isLogged === true ? (
        <ImageEditor user={user} handleLogout={this.handleLogout} />
      ) : (
        // <User
        //       user={this.state.user}
        //       handleLogout={this.handleLogout}
        //       setPassword={this.setPassword}
        //   />
        <Login
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
        />
      );
    return (
      <div className="rde-main">
        {helmet}
        <div className="rde-content">{renderApp}</div>
      </div>
    );
  }
}

export default App;
