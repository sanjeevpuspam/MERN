import React, { Component } from 'react';
import { BrowserRouter , Route, Link } from "react-router-dom";
import './App.css';

import 'react-notifications/lib/notifications.css';


import Header from './Component/Header/Header';
import Main from './Component/Body/MainPage';
import Footer from './Component/Footer/Footer';
import LeftSidebar from "./Component/Body/left-sidebar";


class App extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <React.Fragment>
          <BrowserRouter>
              <div className="container" >
                  <Header />
                  <Main />
                  <Footer />
              </div>
          </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
