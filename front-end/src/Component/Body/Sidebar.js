import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import "react-tabs/style/react-tabs.css";

class Sidebar extends Component {
    constructor(props){
        super(props);
    }

    createNotification = (type,message,title,time=3000) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info(message,title);
                    break;
                case 'success':
                    NotificationManager.success(message, title,time);
                    break;
                case 'warning':
                    NotificationManager.warning(message, title, time);
                    break;
                case 'error':
                    NotificationManager.error(message, title, time, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };

    render() {
        return (
            <React.Fragment>
                <button className='btn btn-info' onClick={this.createNotification('info','this is info message content','Info message title',3000)}>Info</button>
                <hr/>
                <button className='btn btn-success' onClick={this.createNotification('success','this is success message content','success message title',3000)}>Success </button>
                <hr/>
                <button className='btn btn-warning' onClick={this.createNotification('warning','this is warning message content','warning message title',3000)}>Warning</button>
                <hr/>
                <button className='btn btn-danger' onClick={this.createNotification('error','this is danger message content','danger message title',3000)}>Error</button>
                <NotificationContainer/>
            </React.Fragment>
        )
    }
}

export default Sidebar;