import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
        }
    }
    render() {
        return (
            <div>
                Successfully logged in
            </div>
        )
    }
}

export default User;