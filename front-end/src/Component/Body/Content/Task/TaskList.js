import React, { Component } from 'react';
import TasksListArray from './TaskListsJson';
import Config from "../../../../Config/Config";
import { chnageDateFormat } from '../../../../helper.js';



export default class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true
        }
    };

    componentDidMount() {
        fetch(Config.apiUrl+'/api/get-tasks').then(res => res.json())
            .then(json => {
                console.log(json.result);
                this.setState({
                    taskList: json.result,
                    loading:false
                });
            });
    };

    moveToDoneTask = (e) => {
        this.setState({ loading : true });
        let id = e.target.getAttribute('data-id');
        for (var i = 0; i < this.state.taskList.length; i++){
            if (this.state.taskList[i]._id == id){
                this.state.taskList[i].category=2;
            }
        }
        this.setState({
            loading:false,
            taskList: this.state.taskList
        });
    }
    deleteTask = (e) => {
        this.setState({ loading : true });
        let id = e.target.getAttribute('data-id');
        for (var i = 0; i < this.state.taskList.length; i++){
            if (this.state.taskList[i]._id == id){
                this.state.taskList[i].category=0;
            }
        }
        this.setState({
            loading:false,
            taskList: this.state.taskList
        });
    }

    moveToTaskList = (e) => {
        this.setState({ loading : true });
        let id = e.target.getAttribute('data-id');
        for (var i = 0; i < this.state.taskList.length; i++){
            if (this.state.taskList[i]._id == id){
                this.state.taskList[i].category=1;
            }
        }
        this.setState({
            loading:false,
            taskList: this.state.taskList
        });
    }

    printTaskList = () => {
        if(this.state.loading){
            return(
                <li className="loader"></li>
            )
        } else {
            let taskListData = this.state.taskList.filter((x)=>x.category===1);
            const outputData = taskListData.map( d => {
                return (
                    <li className="list-group-item list-group-item-success" key={d._id}>
                        <button className="btn btn-sm btn-success glyphicon glyphicon-chevron-right" data-id={d.id} onClick={this.moveToDoneTask.bind(this)}></button>
                        <hr />
                        <h4 className="list-group-item-heading">{ d.title }</h4>
                        <p className="list-group-item-text">{ d.description }</p>
                        <hr />
                        <p><small>Deadline:  { chnageDateFormat(d.deadline) }</small></p>
                        <p className="text-right">{d.assigned_to}</p>
                    </li>
                )
            });
            return outputData;
        }
    };



    completedTasks = ()=> {
        if(this.state.loading){
            return(
                <li className="loader"></li>
            )
        } else {
            let taskCompletedData =this.state.taskList.filter((x)=>x.category===2);
            const outputData = taskCompletedData.map( d => {
                return (
                    <li className="list-group-item list-group-item-info" key={d.id}>
                        <button className="btn btn-sm btn-info glyphicon glyphicon-chevron-left" data-id={d._id} onClick={this.moveToTaskList.bind(this)}></button>
                        <button className="btn btn-sm btn-danger glyphicon glyphicon-remove" data-id={d._id} onClick={this.deleteTask.bind(this)}></button>
                        <hr />
                        <h4 className="list-group-item-heading">{ d.title }</h4>
                        <p className="list-group-item-text">{ d.description }</p>
                        <hr />
                        <p><small>Deadline:  { chnageDateFormat(d.deadline) }</small></p>
                        <p className="text-right">{ d.assigned_to }</p>
                    </li>
                )
            });
            return outputData;
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-5">
                        <h4>Task List</h4>
                        <ul className="list-group">
                            { this.printTaskList()}
                        </ul>
                    </div>
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-5">
                        <h4>Completed List</h4>
                        <ul className="list-group">
                            { this.completedTasks() }
                        </ul>

                    </div>
                </div>
            </React.Fragment>
        )
    };
}
