import React, { Component } from 'react';
import apiClass from './Api';
import logo from './logo.svg';
import { Text, FieldBox, Button, Logo} from './Components';

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
         text="Создать аккаунт"
         handler={props.handleNewUser}
        />
        <Button
         text="Забыли пароль?"
         handler={props.handleForgot}
        />
        <Button
         text="Войти"
         handler={props.handleCredentials}
        />
    </div>
);

const ForgotBox = (props) => (
    <div>
        <Text class="title" text="Добро пожаловать" />
        <Text class="subtitle" text={props.text} />
        <FieldBox
            fieldName="электронная почта"
            handler={props.handleEmail}
            value={props.email}
            type="email"
        />
        <Button
            text="Назад"
            handler={props.handleForgot}
        />
        <Button
            text="Сбросить пароль"
            handler={props.handleReset}
        />
    </div>
);

const CreateBox = (props) => (
    <div>
        <Text class="title" text="Добро пожаловать" />
        <Text class="subtitle" text={props.text} />
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
         handler={props.handleNewUser}
        />
        <Button
         text="Создать аккаунт"
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
            email: props.username,
            password: props.password,
            forgotten: false,
            isNew: true,
            connectionStatus : '',
            text: props.text,
            logo: {logo},
        };
        this.handleLogin = props.handleLogin.bind(this);
        this.handleReset = props.handleReset.bind(this);
        this.handleCreate = props.handleCreate.bind(this);
    }

    async componentWillMount() {
        await apiClass.statusCheck()
            .then(res => {
                console.log(res);
                this.setState({
                    connectionStatus: res.status
                });
            })
            .catch(err => {
                this.setState({
                    connectionStatus: err
                });
            })
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
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
        console.log(!email && !password);
        if (!email && !password) {
            this.setState({ text: 'Введите данные.'});
            setTimeout(() => {this.setState({ text: ''})}, 5000);
        }
        this.handleLogin();
        
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
        if (this.state.connectionStatus === 200) {
            logoClass = "loaded";
        }
        return (
        <div className="background">
            <div className="box">
                <Logo logoDiv="logoDiv" class={logoClass} logo={logo} />
                {this.state.connectionStatus === 200 &&
                    <UserLogin
                        handleSubmit={this.handleSubmit}
                        email={this.state.email}
                        password={this.state.password}
                        forgotten={this.state.forgotten}
                        isNew={this.state.isNew}
                        handleEmail={this.handleEmail}
                        handlePassword={this.handlePassword}
                        handleCredentials={this.handleCredentials}
                        handleReset={this.handleReset}
                        handleForgot={this.handleForgot}
                        handleNewUser={this.handleNewUser}
                        text={this.state.text}
                    />
                }
            </div>
        </div>);
    }
}

export default Login;