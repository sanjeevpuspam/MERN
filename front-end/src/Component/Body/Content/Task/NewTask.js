import React, { Component } from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import Calendar from 'ciqu-react-calendar'

import TasksListArray from './TaskListsJson';


export default class NewTask extends Component {

    constructor(props){
        super(props);
        this.state = {
            task: null,
            description: null,
            assigned_to: null,
            deadline: null,
            value: moment(),
            taskList: TasksListArray,
            isSubmitted: false,
            formErrors: {
                task: "",
                description: "",
                deadline: "",
                assigned_to: ""
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange = (value, inputValue) => {
        console.log(value.format('YYYY-MM-DD'))
        this.setState({value})
    }
    onOpenChange = (status) => {
        console.log('open status: ' + status)
    }
    disabledDate = (currentDate, inputValue) => {
        return false
    }

    handleSubmit = e => {
        e.preventDefault();

        let taskList =  this.state.taskList;
        console.log(taskList);
        if(formValid(this.state)) {

            let newTask = {
                "id": taskList.length + 1,
                "title" : this.state.task,
                "description" : this.state.description,
                "assigned_to" : this.state.assigned_to,
                "deadline" : this.state.deadline,
                "category": 1
            }
            taskList.push(newTask);
            this.setState({
                taskList : taskList,
                isSubmitted: true
            });
            setTimeout(
                function() {
                    this.setState({
                        isSubmitted: false
                    });
                    this.createTask.reset();
                }.bind(this),3000
            );

        } else {
            this.setState({
                formErrors: {
                    task: "",
                    description: "",
                    deadline: "",
                    assigned_to: ""
                }
            });
        }
    };
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "task":
                formErrors.task =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "description":
                formErrors.description =
                    value.length < 20 ? "minimum 20 characaters required" : "";
                break;
            case "deadline":
                formErrors.deadline =
                    value.length < 11 ? "minimum 11 characaters required" : "";
                break;
            case "assigned_to":
                formErrors.assigned_to =
                    value.assigned_to < 5 ? "minimum 5 characaters required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };

    render() {
        const {onChange, onOpenChange, disabledDate} = this;
        return (
            <div className="row">
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="task">Task</label>
                        <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-newspaper-o"></i></span>
                        <input className="form-control" placeholder="Write task description"  type="text" name="task" noValidate onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="assigned_to">Name:</label>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-user"></i></span>
                        <input className="form-control" type="text" placeholder="Enter Name here" name="assigned_to" noValidate onChange={this.handleChange}    />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="deadline">Enter Dadeline date</label>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-calendar-check-o"></i></span>
                        <input className="form-control" type="date" placeholder="DDD-MM-YYYY" name="dadeline" min="2018-12-11" max="2019-12-31" noValidate onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Task description:</label>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-pencil-square-o"></i></span>
                        <textarea className="form-control" rows="5" id="description" placeholder="New Task" name="description" noValidate onChange={this.handleChange} />
                    </div>
                </div>
                    <button type="submit" className="btn btn-primary">Add new</button>
            </form>

            </div>
        );
    }
}

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });
    return valid;
};
