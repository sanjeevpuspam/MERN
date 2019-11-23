import React from 'react';
import Button from "../Body/ReusableComponents/Button";
import {Link} from "react-router-dom";


class UserRegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    submituserRegistrationForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["username"] = "";
            fields["name"]     = "";
            fields["email"]  = "";
            fields["phone"] = "";
            fields["password"] = "";
            this.setState({fields:fields});
            alert("Form submitted");
        }
    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }

        if (typeof fields["username"] !== "undefined") {
            if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["username"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["emailid"]) {
            formIsValid = false;
            errors["emailid"] = "*Please enter your email-ID.";
        }

        if (typeof fields["emailid"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["emailid"])) {
                formIsValid = false;
                errors["emailid"] = "*Please enter valid email-ID.";
            }
        }

        if (!fields["mobileno"]) {
            formIsValid = false;
            errors["mobileno"] = "*Please enter your mobile no.";
        }

        if (typeof fields["mobileno"] !== "undefined") {
            if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["mobileno"] = "*Please enter valid mobile no.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    render() {
        return (
            <div className="registration-form">
                    <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                <input type="text" className="form-control" name="username" placeholder="username" value={this.state.fields.username} onChange={this.handleChange} />
                            </div>
                            <span className="errorMsg">{this.state.errors.username}</span>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                <input type="text" className="form-control" name="name" placeholder="full namae" value={this.state.fields.name} onChange={this.handleChange} />
                            </div>
                            <span className="errorMsg">{this.state.errors.name}</span>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                <input type="text" className="form-control" name="emailid" placeholder="Emial id" value={this.state.fields.emailid} onChange={this.handleChange}  />
                            </div>
                            <span className="errorMsg">{this.state.errors.emailid}</span>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-mobile"></i></span>
                                <input type="text" className="form-control" name="mobileno" placeholder="Mobile No." value={this.state.fields.mobileno} onChange={this.handleChange}   />
                            </div>
                            <span className="errorMsg">{this.state.errors.mobileno}</span>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.fields.password} onChange={this.handleChange} />
                            </div>
                            <span className="errorMsg">{this.state.errors.password}</span>

                        </div>

                        <div className="input-group">
                            <span className="input-group-addon"><input type="checkbox" /></span>
                            <input type="hidden" className="form-control" />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary login-btn btn-block">Register</button>
                            <br />
                            <Link className="text-right" to="/">Login?</Link>
                        </div>
                    </form>

                </div>

        );
    }

}
export default UserRegisterForm;