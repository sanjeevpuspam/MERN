import React, { Component } from 'react';
import {Route} from "react-router-dom";

import Home from "./Body/Content/Home";
import About from "./Body/Content/About";
import Blog from "./Body/Content/Blog";
import UserList from "./Body/Content/User/UserList";
import TaskList from "./Body/Content/Task/TaskList";
import NewTask from "./Body/Content/Task/NewTask";
import UserRegisterForm from "./Forms/UserRegistratioin";
import Dashboard from "./Body/Content/dashboard";
import LogOut from "./Body/Content/Logout";
import EditUser from "./Body/Content/User/user-edit";



export default class Routes extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" component={ Home } />
                <Route exact path="/login" component={ Home } />
                <Route path="/about" component={ About } />
                <Route path="/blog" component={ Blog} />
                <Route path="/user-list" component={UserList} />
                <Route path="/task" component={TaskList} />
                <Route path="/new-task" component={NewTask} />
                <Route path="/sign-up" component={ UserRegisterForm } />
                <Route path="/dashboard" component={ Dashboard}/>
                <Route path="/logout" component={LogOut} />
                <Route path="/edit-user/:id" component={ EditUser } />

            </React.Fragment>
        )
    }
}