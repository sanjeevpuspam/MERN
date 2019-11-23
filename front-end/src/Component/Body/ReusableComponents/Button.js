import React, { Component } from 'react';

export default class Button extends Component {
    constructor(props){
        super(props);
    };

    buttonStyle = {
        margin: '10px 0px 10px 0'
    };

    render() {
        return (
            <button
                type={this.props.btnType}
                className={this.props.class}
                onClick={()=>this.props.handleClick(this.props.data)} >
                {this.props.label}
            </button>
        )
    }
}