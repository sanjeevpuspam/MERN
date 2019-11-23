import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {SetToken} from "../../helper.js";

import Button from "../Body/ReusableComponents/Button";
import Config from "../../Config/Config";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
class UserLogin extends Component {

    constructor(props){
        super(props);
        this.state = {
            fields: { email:'', password:''},
            errors: {},
            isSubmitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({ fields });
    };

    setToken(idToken){
        localStorage.setItem('id_token',idToken)
    }
    getToken() {
        return localStorage.getItem('id_token')
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            let fields = {};

            fields["email"] = "";
            fields["password"] = "";

            this.isValidUser(this.state.fields);
        }
    };

    isValidUser = (jsonData) => {
        fetch(Config.apiUrl+'/login', {method: "post",
            headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(jsonData)
        }).then((response) => {
            return response.json();
        }).then((data)=> {
            if(data.status){
                if(SetToken(data.result.token)){
                    NotificationManager.success('login successfully', 'Success !', 5000);
                    this.props.history.push("/dashboard");
                }
            } else {
                NotificationManager.error(data.message, 'Error !' ,3000);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }

        if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        /* if (typeof fields["password"] !== "undefined") {
             if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                 formIsValid = false;
                 errors["password"] = "*Please enter secure and strong password.";
                 this.setState({ isSubmitted: false});
             }
         }*/
        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    render() {
        return (
            <React.Fragment>
                <div className="login-form">
                    <form  onSubmit={this.handleLoginSubmit} noValidate>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                <input type="text" className="form-control" name="email" placeholder="Email" value={this.state.fields.email} noValidate onChange={this.handleChange} />
                            </div>
                            <span className="errorMsg">{this.state.errors.email}</span>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                <input type="password" className="form-control" name="password" placeholder="Password" noValidate value={this.state.fields.password} onChange={this.handleChange}  />
                            </div>
                            <span className="errorMsg">{this.state.errors.password}</span>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary login-btn btn-block">Sign in</button>
                        </div>
                        <Link className="text-right" to="/sign-up">Sign up?</Link>

                    </form>

                </div>
                <NotificationContainer/>
            </React.Fragment>
        )
    };
}

export default withRouter(UserLogin)