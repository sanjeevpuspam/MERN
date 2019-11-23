import React, { Component } from 'react';
import {GetToken, DecodeToken} from "../../../helper.js";


export default class Dashboard extends Component {
    constructor(props){
        super(props);
        if(!GetToken()){
            props.history.push("/");
        }
        this.state = {
            'name' : '',
            'email' : '',
        }
    };

    componentDidMount() {
        let user = DecodeToken();
        this.setState({
            'name' : user.name,
            'email' : user.email
        });
        console.log(user);
    }

    render() {
        return (
           <div className="row">
               Welcome { this.state.name }
           </div>
        )
    }
}