import React, { Component } from 'react';
import Pagination from "react-js-pagination";

import Config from '../../../Config/Config';

class Blog extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:true,

            data:null
        }
    }

    componentDidMount() {
        fetch(Config.baseUrl+'/photos').then(res => res.json())
            .then(json => {
                this.setState({
                    loading:false,
                    data:json
                });
            });
    };


    printPosts(){
        if(this.state.loading){
            return(
                <div className="loader">
                    <div className="dash uno"></div>
                    <div className="dash dos"></div>
                    <div className="dash tres"></div>
                    <div className="dash cuatro"></div>
                </div>
            )
        } else {
            let getData = this.state.data;
            const outputData = getData.map( d => {
                return (
                    <React.Fragment>
                        <div className="col-md-4" key={d.id}>
                            <div className="thumbnail" >
                                <img src={d.url}  style={{width:'100%'}} />
                                <div className="caption" >
                                    <p>{ (d.title).substr(0,35) }</p>
                                </div>
                            </div>
                        </div>

                    </React.Fragment>
                )
            });
            return outputData;
        }
    };

    render() {
        return (
            <div className="row">

                { this.printPosts() }
            </div>
        )}
}

export default Blog;
