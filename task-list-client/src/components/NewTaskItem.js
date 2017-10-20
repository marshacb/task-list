import React, { Component } from "react";
import { connect } from "react-redux";
import { updateFormState, postTask } from "../actions/taskActions";
import { Link } from 'react-router-dom'

export class NewTaskItem extends Component {

  updateFormState = (formState, e) => {
    this.props.updateFormState({[formState]: e.target.value})
  };

  postNewTask(e) {
    e.preventDefault()
    const task = {
      name: this.props.formState.taskName,
      description: this.props.formState.taskDescription,
      dueDate: new Date(this.props.formState.taskDueDate),    
    }

    this.props.postTask(task)
    this.props.history.push("/")
  }

  render() {
    return (
      <div className='newtaskitem'>
        <h2>Create New Task</h2>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input
                  placeholder="Task Name"
                  onChange={(e) => this.updateFormState("taskName", e)}
                  type="text"
                  className="validate"
                />
              </div>
              <div className="input-field col s6">
                <input
                  placeholder="Description"
                  onChange={(e) => this.updateFormState("taskDescription", e)}
                  type="text"
                  className="validate"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="Due Date"
                  onChange={(e) => this.updateFormState("taskDueDate", e)}
                  type="text"
                  className="datepicker"
                />
              </div>
            </div>
          </form>
          <Link
            to="/"
            onClick={(e) => (this.postNewTask(e))}
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Submit
            <i className="material-icons right">send</i>
          </Link>
          <Link style={{float: "right"}} className="waves-effect waves-light btn" to="/">
            Back
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formState: state.formState
  };
};
export default connect(mapStateToProps, { updateFormState, postTask })(NewTaskItem);
