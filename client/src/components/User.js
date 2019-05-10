import React, { Component } from 'react';
import { SideBar, TopBar, History, PasswordChange, Logout, Users} from './Components';
import apiClass from './Api';

const options = ['История', 'Смена пароля']

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            users: null,
            username: '',
            email: '',
            password: '',
        }
        this.handleLogout = props.handleLogout.bind(this);
        this.setPassword = props.setPassword.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user,
        });
    }

    async componentDidMount() {
        let email = this.state.user.email;
        if (email === 'admin@admin.com') {
            await apiClass.fetchUsers()
                .then(users => {
                    this.setState({
                        users: users,
                    });
                    console.log(users);
                }).catch(err => console.log(err));
        }
    }
    componentWillUnmount() {
        this.setState({
            user: null,
            username: '',
            email: '',
            password: '',
        });
    }
    handleUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
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
    handleButton = (e) => {
        let { password } = this.state;
        if (password) {
            this.setPassword(this.state.password)
        }
        return;
    }
    render() {
        console.log(this.state.users)
        return (
            <div className="background-user" id="page-wrap">
                <SideBar
                    nav={options}
                />
                <TopBar
                    username={this.state.user.username}
                />
                <div className="main-part">
                    {this.state.users !== null &&
                    (<Users
                        head='Список пользователей'
                        description='Здесь можете просмотреть список всех пользователей'
                        data={this.state.users}
                    />)
                }
                    <History
                        head='История'
                        description='Здесь вы можете посмотреть историю ваших действий'
                        data={this.state.user.data}
                    />
                    <PasswordChange
                        head='Смена пароля'
                        description='Осуществите смену пароля'
                        val={this.state.password}
                        handler={this.handlePassword}
                        buttonHandler={this.handleButton}
                    />
                    <Logout
                        head='Выйти из системы'
                        handleLogout={this.handleLogout}
                        //handlers and data go here
                    />
                </div>
            </div>
        )
    }
}

export default User;