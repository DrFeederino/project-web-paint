import React, { Component } from 'react';
import apiClass from './Api';
import logo from './logo.svg';
import { Text, FieldBox, Button, Logo} from './Components';
import './styles.css';

const LoginBox = (props) => (
    <div className="inside-box">
        <Text class="title" text="Добро пожаловать" />
        <Text class="subtitle" text={props.text} />
        <FieldBox
            fieldName="электронная почта*"
            handler={props.handleEmail}
            value={props.email}
            type="email"
        />
        <FieldBox
            fieldName="пароль*"
            handler={props.handlePassword}
            value={props.password}
            type="password"
        />
        <div className="buttons-box">
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
                handler={props.handleLogin}
            />
        </div>
    </div>
);

const ForgotBox = (props) => (
    <div className="inside-box">
        <Text class="title" text="Добро пожаловать" />
        <Text class="subtitle" text={props.text} />
        <FieldBox
            fieldName="электронная почта*"
            handler={props.handleEmail}
            value={props.email}
            type="email"
        />
        <div className="buttons-box">
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
    </div>
);

const CreateBox = (props) => (
    <div className="inside-box">
        <Text class="title" text="Добро пожаловать" />
        <Text class="subtitle" text={props.text} />
        <FieldBox
            fieldName="имя пользователя*"
            handler={props.handleUsername}
            value={props.username}
            type="text"
        />
        <FieldBox
            fieldName="электронная почта*"
            handler={props.handleEmail}
            value={props.email}
            type="email"
        />
        <FieldBox
         fieldName="пароль*"
         handler={props.handlePassword}
         value={props.password}
         type="password"
        />
        <div className="buttons-box">
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
                handleLogin={props.handleLogin}
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
            connectionStatus : 0,
            text: props.text,
            logo: {logo},
        };
        this.handleLogin = props.handleLogin.bind(this);
        this.handleCreate = props.handleCreate.bind(this);
        this.handleEmail = props.handleEmail.bind(this);
        this.handlePassword = props.handlePassword.bind(this);
        this.handleUsername = props.handleUsername.bind(this);
        this.handleReset = props.handleReset.bind(this);
        this.setPassword = props.setPassword.bind(this);
        this.setText = props.setText.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            username: nextProps.username,
            email: nextProps.email,
            password: nextProps.password,
            text: nextProps.text,
        });
    }

    async componentWillMount() {
        let res = await apiClass.statusCheck();
        if (!res.status) {
            this.setState({
                connectionStatus: 500,
                text: 'Произошла внутренняя ошибка',
            });
        } else {
            this.setState({
                connectionStatus: res.status,
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleNewUser = () => {
        this.setState(state => ({
            isNew: !state.isNew,
        }));
    }
    
    handleForgot = () => {
        this.setPassword('');
        !this.state.forgotten ?
            this.setText('Введите электронную почту для сброса') :
            this.setText('');
        this.setState(state => ({
            forgotten: !state.forgotten,
        }));
    }

    render() {
        let logoClass = "loading";
        if (logoClass !== 'loaded' && this.state.connectionStatus === 200) {
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
                        username={this.state.username}
                        password={this.state.password}
                        forgotten={this.state.forgotten}
                        isNew={this.state.isNew}
                        handleUsername={this.handleUsername}
                        handleEmail={this.handleEmail}
                        handlePassword={this.handlePassword}
                        handleLogin={this.handleLogin}
                        handleReset={this.handleReset}
                        handleForgot={this.handleForgot}
                        handleNewUser={this.handleNewUser}
                        handleCreate={this.handleCreate}
                        text={this.state.text}
                    />
                }
                {this.state.connectionStatus === 500 && // can be replaced with Error component
                    <Text
                        text={this.state.text}
                        class="error-subtitle"
                    />
                }
            </div>
        </div>);
    }
}

export default Login;