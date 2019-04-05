import React, { Component } from 'react';
import apiClass from './Api';
import logo from './logo.svg';
import { Text, FieldBox, Button, Logo} from './Components';
import './styles.css';

const LoginBox = (props) => (
    <div className="login-box">
        <Text class="title" text="Добро пожаловать" />
        <Text class="error-subtitle" text={props.text} />
        <FieldBox
            fieldName="имя пользователя"
            handler={props.handleEmail}
            value={props.email}
            type="email"
        />
        <FieldBox
            fieldName="пароль"
            handler={props.handlePassword}
            value={props.password}
            type="password"
        />
        <Button
            type="button"
            text="Создать аккаунт"
            handler={props.handleNewUser}
        />
        <Button
            type="button"
            text="Забыли пароль?"
            handler={props.handleForgot}
        />
        <Button
            type="submit"
            text="Войти"
            handler={props.handleCredentials}
        />
    </div>
);

const ForgotBox = (props) => (
    <div className="box">
        <Text class="title" text="Добро пожаловать" />
        <Text class="subtitle" text={props.text} />
        <FieldBox
            fieldName="электронная почта"
            handler={props.handleEmail}
            value={props.email}
            type="email"
        />
        <Button
            type="button"
            text="Назад"
            handler={props.handleForgot}
        />
        <Button
            type="submit"
            text="Сбросить пароль"
            handler={props.handleReset}
        />
    </div>
);

const CreateBox = (props) => (
    <div className="box">
        <Text class="title" text="Добро пожаловать" />
        <Text class="subtitle" text={props.text} />
        <FieldBox
            fieldName="имя пользователя"
            handler={props.handleUsername}
            value={props.username}
            type="text"
        />
        <FieldBox
            fieldName="электронная почта"
            handler={props.handleEmail}
            value={props.email}
            type="email"
        />
        <FieldBox
         fieldName="пароль"
         handler={props.handlePassword}
         value={props.password}
         type="password"
        />
        <Button
         text="Уже зарегестрированы?"
         type="button"
         handler={props.handleNewUser}
        />
        <Button
         text="Создать аккаунт"
         type="submit"
         handler={props.handleCreate}
        />
    </div>
);

const UserLogin = (props) => {
    let box;
    if (!props.isNew) {
        box = !props.forgotten ?
            <LoginBox
                handleEmail={props.handleEmail}
                handlePassword={props.handlePassword}
                email={props.email}
                password={props.password}
                handleCredentials={props.handleCredentials}
                text={props.text}
                handleForgot={props.handleForgot}
                handleNewUser={props.handleNewUser}
            /> :
            <ForgotBox
                handleEmail={props.handleEmail}
                email={props.email}
                text={props.text}
                handleForgot={props.handleForgot}
                handleReset={props.handleReset}
            />;
    } else {
        box = (
            <CreateBox
                handleEmail={props.handleEmail}
                email={props.email}
                handlePassword={props.handlePassword}
                password={props.password}
                text={props.text}
                handleNewUser={props.handleNewUser}
                handleCreate={props.handleCreate}
                username={props.username}
                handleUsername={props.handleUsername}
            />);
    }
    return (
    <div className="login">
        <form className="auth" onSubmit={props.handleSubmit}>
        {box}
        </form>
    </div>
    )
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            email: props.email,
            password: props.password,
            forgotten: false,
            isNew: true,
            connectionStatus : '',
            text: props.text,
            logo: {logo},
        };
        this.handleLogin = props.handleLogin.bind(this);
        this.handleCreate = props.handleCreate.bind(this);
        this.handleEmail = props.handleEmail.bind(this);
        this.handlePassword = props.handlePassword.bind(this);
        this.handleUsername = props.handleUsername.bind(this);
    }

    async componentWillMount() {
        let res = await apiClass.statusCheck();
        this.setState({
            connectionStatus: res.status,
        })
        console.log(res);
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleNewUser = () => {
        this.setState(state => ({
            isNew: !state.isNew,
        }));
    }

    handleCredentials = () => {
        let { email, password } = this.state;
        console.log(email);
        console.log(this.state);
        if (!email && !password) {
            this.setState({ text: 'Введите данные.'});
            setTimeout(() => {this.setState({ text: ''})}, 5000);
        } else {
            this.handleLogin();
        }
    }

    handleForgot = () => {
        this.setState(state => ({
            password: '',
            forgotten: !state.forgotten,
            text: !state.forgotten ? "Введите электронную почту для сброса пароля" : '',
        }));
    }

    render() {
        let logoClass = "loading";
        if (logoClass !== 'loaded' && this.state.connectionStatus === 200) {
            logoClass = "loaded";
            console.log(this.state)
        }
        return (
        <div className="background">
            <div className="box">
                <Logo logoDiv="logoDiv" class={logoClass} logo={logo} />
                {this.state.connectionStatus === 200 &&
                    <UserLogin
                        handleSubmit={this.handleSubmit}
                        email={this.state.email}
                        username={this.state.username}
                        password={this.state.password}
                        forgotten={this.state.forgotten}
                        isNew={this.state.isNew}
                        handleUsername={this.handleUsername}
                        handleEmail={this.handleEmail}
                        handlePassword={this.handlePassword}
                        handleCredentials={this.handleCredentials}
                        handleReset={this.handleReset}
                        handleForgot={this.handleForgot}
                        handleNewUser={this.handleNewUser}
                        handleCreate={this.handleCreate}
                        text={this.state.text}
                    />
                }
            </div>
        </div>);
    }
}

export default Login;