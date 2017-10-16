import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/taskActions";
import { Link } from "react-router-dom";
import TaskList from "./TaskList";

export class Welcome extends Component {
  componentDidMount() {
      this.props.getTaskList();
  }

  componentWillMount() {
    this.props.getTaskList();
  }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              Task List
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="">About</a>
              </li>
            </ul>
          </div>
        </nav>
        <Link to="/create"
            style={{ float: "right", margin: "3px" }}
            className="btn-floating btn-large waves-effect waves-light red"
         >
            <i className="material-icons">add</i>
        </Link>
        <div>
          <TaskList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    taskList: state.taskList
  };
};

export default connect(mapStateToProps, actions)(Welcome);
