import React, { Component } from 'react';
import { Link } from "react-router-dom";

class LeftSidebar extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li><Link to="/posts">Post</Link></li>
                        <li><Link to="/users">Users</Link></li>
                        <li><Link to="/new-task">New Task</Link></li>
                        <li><Link to="/task-list">Task LIst</Link></li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default LeftSidebar;