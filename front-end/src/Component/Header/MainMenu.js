import React, { Component } from 'react';
import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';

import {SetToken, GetToken} from "../../helper.js";

export default class MainMenu extends Component {

    constructor(props){
        super(props);
    }


    loginLogoutMenu =() => {
        if(GetToken()){
            return(
                <NavItem eventKey={1} href="/logout">Logout</NavItem>
            )
        }
        return (
            <NavDropdown eventKey={1} title="User" id="basic-nav-dropdown">
                <MenuItem eventKey={1.1} href="/login">Login ?</MenuItem>
                <MenuItem eventKey={1.2} href="/sign-up">Register ?</MenuItem>
            </NavDropdown>
        )
    }

    adminMenuOption =() => {
        if(GetToken()){
            return (
               <React.Fragment>
               <NavDropdown eventKey={4} title="New" id="basic-nav-dropdown">
                    <MenuItem eventKey={4.1} href="/new-user">User</MenuItem>
                    <MenuItem eventKey={4.2} href="/new-task">Task</MenuItem>
                </NavDropdown>
                <NavDropdown eventKey={5} title="List" id="basic-nav-dropdown">
                    <MenuItem eventKey={5.1} href="/user-list">User's</MenuItem>
                    <MenuItem eventKey={5.2} href="/task">Task's</MenuItem>
                </NavDropdown>
               </React.Fragment>
           )
        } else {
            return (
            <NavDropdown eventKey={4} title="List" id="basic-nav-dropdown">
                <MenuItem eventKey={4.1} href="/user-list">User's</MenuItem>
                <MenuItem eventKey={4.2} href="/task">Task's</MenuItem>
                </NavDropdown>
            )
        }
    }





    render() {
        return (
            <React.Fragment>
            <div className="container">

                <Navbar inverse>
                    <Nav>
                        <NavItem eventKey={1} href="/">Home</NavItem>
                        <NavItem eventKey={2} href="/about">About</NavItem>
                        <NavItem eventKey={3} href="/blog">Blog</NavItem>
                        { this.adminMenuOption() }
                    </Nav>
                    <Nav pullRight>
                        { this.loginLogoutMenu() }
                    </Nav>
                </Navbar>


            </div>
            </React.Fragment>
        )
    };
}