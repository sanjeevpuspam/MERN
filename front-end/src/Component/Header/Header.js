import React, { Component } from 'react';


import MainMenu from './MainMenu';
import {BrowserRouter} from "react-router-dom";

class Header extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <MainMenu />
                </div>
            </React.Fragment>
        )
    }
}

export default Header;