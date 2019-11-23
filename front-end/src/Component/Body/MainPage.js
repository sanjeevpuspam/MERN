import React, { Component } from 'react';

import Sidebar from "./Sidebar";
import Routes from "../Route";


class Main extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="container">
                        <div className="col-10 col-md-10">
                            <Routes />
                        </div>
                        <div className="col-2 col-md-2"><Sidebar/></div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Main;