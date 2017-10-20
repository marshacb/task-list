import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class TaskDetail extends Component {
  render() {
    return (
      <div className='taskdetail' >
        TaskDetail
        <div>Name: {this.props.taskDetail[0].name}</div>
        <div>Description: {this.props.taskDetail[0].description}</div>
        <div>Due Date: {this.props.taskDetail[0].due_date}</div>
        <div>Completed: {this.props.taskDetail[0].completed.toString()}</div>
        <div>
          <Link
            style={{ float: "right" }}
            className="waves-effect waves-light btn"
            to="/"
          >
            Back
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateProps = (state, ownProps) => {
  return {
    taskDetail: state.taskList.filter(task => {
      return parseInt(task.id, 10) === parseInt(ownProps.match.params.id, 10);
    })
  };
};

export default connect(mapStateProps, null)(TaskDetail);
