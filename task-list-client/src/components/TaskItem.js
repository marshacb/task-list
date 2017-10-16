import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTask, updateTask } from "../actions/taskActions";

class TaskItem extends Component {
  updateComplete() {
    this.props.updateTask(this.props.item.id);
  }

  renderDueStatus() {
    const today = new Date()
    const tomorrow = new Date()
    const taskDueDate = new Date(this.props.item.due_date)
    tomorrow.setDate(today.getDate()+1);
    if (taskDueDate.getDate() === today.getDate() || taskDueDate.getDate() ===   tomorrow.getDate()) {
      return (
        <span style={{ float: "right" }}>
          <i className="material-icons">access_time</i>
          <span>Due Today or Tomorrow</span>
        </span>
      )
    } else if(taskDueDate.getDate() < today.getDate()){
      return  <span style={{ float: "right" }}>
      <i className="material-icons">error</i>
      <span>Past Due</span>
    </span>
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                {this.renderDueStatus()}
                <span className="card-title">{this.props.item.name}</span>
                <p>{this.props.item.description}</p>
              </div>
              <div className="card-action">
                <Link to={`/details/${this.props.item.id}`}>Details</Link>
                <Link
                  to=""
                  onClick={() => this.props.deleteTask(this.props.item.id)}
                >
                  {" "}
                  Delete Item
                </Link>
                {this.props.item.completed ? (
                  <span to="">Complete</span>
                ) : (
                  <Link to="" onClick={() => this.updateComplete()}>
                    Mark Complete
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { tasks: state.taskList };
};

export default connect(mapStateToProps, { deleteTask, updateTask })(TaskItem);
