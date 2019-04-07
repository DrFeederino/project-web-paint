import React, { Component } from 'react';
import { SideBar, TopBar, Section } from './Components';

const options = {
    "История" : "Здесь вы можете посмотреть историю ваших действий",
    "Смена пароля": "Осуществите смену пароля",
    "Выход": "",
};

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            username: '',
            email: '',
            password: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user,
        });
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

    render() {
        console.log(this.state.user)
        return (
            <div className="background-user" id="page-wrap">
                <SideBar
                    nav={Object.keys(options)}
                />
                <div className="main-part">
                    <TopBar
                        username={this.state.username}
                    />
                    {Object.keys(options).map(id => (
                        <Section
                        id={id}
                        head={id}
                        description={options[id]}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default User;