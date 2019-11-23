import React, { Component } from 'react';
import {GetToken} from "../../../helper.js";

import UserLogin from "../../Forms/UserLogin";
import Dashboard from "./dashboard";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            data:null
        }
    }

    home = ()=> {
        if(!GetToken()){
            return (
                <UserLogin />
            )
        } else {
            return (
                <Dashboard />
            )
        }

    }
    render() {
        return (
            <div className="row">
                { this.home() }
            </div>
        )}
}

export default Home;