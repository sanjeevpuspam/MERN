import React, { Component } from 'react';
import {FlushCookie} from "../../../helper.js";

export default class LogOut extends Component {
    constructor(props){
        super(props);
        this.logout();
    };

    logout = () => {
        FlushCookie();
        this.props.history.push("/");
    };

    render() {
        return (
            <div>Log Out</div>
        )
    }
}