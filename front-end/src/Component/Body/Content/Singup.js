import React, { Component } from 'react';

import UserRegisterForm from "../../Forms/UserRegistratioin";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            data:null
        }
    }
    render() {
        return (
            <div className="row">
                <UserRegisterForm />
            </div>
        )}
}

export default Home;