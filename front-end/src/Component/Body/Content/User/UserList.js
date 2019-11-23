import React, { Component } from 'react';
import Config from "../../../../Config/Config";
import Button from "../../ReusableComponents/Button";
import { DecodeToken } from "../../../../helper";
import {NotificationManager} from "react-notifications";



export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null
        }
    }

    componentDidMount() {
        fetch(Config.apiUrl+'/Api/user-list').then(res => res.json())
            .then(json => {
                this.setState({
                    loading: false,
                    data: json.result
                });
            });
    };

    printUsers = () => {
        if (this.state.loading) {
            return (
                <tr>
                    <td>
                        <p className="loader"></p>
                    </td>
                </tr>
            )
        } else {
            let data = this.state.data;

            const outputData = data.map(d => {
                return (
                    <tr key={d._id}>
                        <td>{d.name}</td>
                        <td>{d.email}</td>
                        <td>{d.username}</td>
                        <td>{d.phone}</td>
                        <td>{ this.YesNo(d.status) }</td>
                        <td>{ this.YesNo(d.is_admin) }</td>
                        <td>{ d.created_by }</td>
                        <td>{d.created_on}</td>
                        <td>
                            <Button btnType="button" label="Edit" class="btn btn-info btn-sm" data={d} handleClick={this.editUsersProfile} />
                            <Button btnType="button" label="Delete" class="btn btn-danger btn-sm" data={d} handleClick={this.deleteUser} />
                        </td>
                    </tr>
                )
            });
            return outputData;
        }
    };
    editUsersProfile = (data) => {
        this.props.history.push({
            pathname: "/edit-user/"+ data._id,
            state:{
                "_id": data._id,
                "email": data.email,
                "name" : data.name,
                "phone" : data.phone
            }
        });
    }
    deleteUser = (data) => {
        const userData = DecodeToken();
        if(data.email == userData.email){
            NotificationManager.error('You can`t delete self profile', 'Error !' ,3000);
        }
    }

    YesNo = (bool)=> {
        return ( bool==1 ?"Yes":"No");
    }

    render() {
        return (
            <div className="row">
                <table className="table  table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Is Admin</th>
                        <th>Created By</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.printUsers()}
                    </tbody>
                </table>
            </div>
        )
    }
}
