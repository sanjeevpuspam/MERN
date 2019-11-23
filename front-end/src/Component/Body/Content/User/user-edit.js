import React, { Component } from 'react';
import Config from "../../../../Config/Config";
import { SetToken, DecodeToken } from "../../../../helper";
import {NotificationManager} from "react-notifications";

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            fields: { name:'', phone:'' },
            errors: { name:'', phone:'' }
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitUserEdit = this.submitUserEdit.bind(this);
    }

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({ fields });
    };

    componentDidMount(){
        let empData = this.props.location.state;
        this.setState({
            loading: false,
            fields: {
                id: empData._id,
                email: empData.email,
                name : empData.name,
                phone : empData.phone
            }
        });
    };

    submitUserEdit = (e)=> {
        e.preventDefault();
        if(this.validateForm()){
            this.updateUserData(this.state.fields);
        }
    };

    updateUserData = (jsonData) => {
        console.log(jsonData);
        fetch(Config.apiUrl+'/api/update-userprofile', {method: "post",
            headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(jsonData)
        }).then((response) => {
            return response.json();
        }).then((data)=> {
            if(data.status){
                NotificationManager.success(data.message, 'Success !', 5000);
                this.updateSefProfile(data);
            } else {
                NotificationManager.error(data.message, 'Error !' ,3000);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    updateSefProfile = (data)=>{
        let tokenEmail = DecodeToken().email;
        if(tokenEmail==data.email){
            SetToken(data);
            return true;
        } else {
            return false;
        }

    };

    validateForm(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter your full name.";
        }

        if (!fields["phone"]) {
            formIsValid = false;
            errors["phone"] = "*Please enter your mobile no.";
        }

        if((!fields["phone"].match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))){
            formIsValid = false;
            errors["phone"] = "*Please enter valid mobile no.";
        }
        /*if(typeof fields["phone"] !== "undefined") {
            if (!fields["phone"].test(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["phone"] = "*Please enter valid mobile no.";
            }
        }*/
        this.setState({
            errors: errors
        });

        return formIsValid;
    }

    getUserDetails = () => {
        if (this.state.loading) {
            return (
                <p className="loader"></p>
            )
        } else {
            let data = this.state.data;
            return (
                <React.Fragment>
                    <form  onSubmit={this.submitUserEdit} noValidate>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                <input type="text" className="form-control" name="name" placeholder="full namae" value={ this.state.fields.name } noValidate onChange={this.handleChange}  />
                            </div>
                            <span className="errorMsg">{this.state.errors.name}</span>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-mobile"></i></span>
                                <input type="number" className="form-control" name="phone" placeholder="Mobile No." value={ this.state.fields.phone } noValidate onChange={this.handleChange} />
                            </div>
                            <span className="errorMsg">{this.state.errors.phone}</span>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary login-btn btn-block">Update</button>
                        </div>
                    </form>
                </React.Fragment>
            );
        }
    };


    render() {
        return (
            <div className="row">
                <form>

                </form>
                { this.getUserDetails() }
            </div>
        )
    }
}