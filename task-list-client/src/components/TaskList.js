import React, { Component } from 'react'
import TaskItem from './TaskItem'
import { connect } from 'react-redux'
import { filterCompleted, filterDueTodayOrTomorrow, getTaskList, filterOverDue } from '../actions/taskActions'

export class TaskList extends Component {

    render() {
        return (
            <div className='tasklist' >    
            <button className="waves-effect blue darken-2 btn" onClick={() => {this.props.getTaskList()}} style={{float: "right"}}>Remove Previous Filters</button>
            <button className="waves-effect waves-light btn" onClick={() => {this.props.filterCompleted(this.props.taskList)}} style={{float: "right"}}>Filter Completed</button>
            <button className="waves-effect waves-light btn" onClick={() => {this.props.filterOverDue(this.props.taskList)}} style={{float: "left"}}>Filter Overdue</button>
            <button className="waves-effect waves-light btn" onClick={() => {this.props.filterDueTodayOrTomorrow(this.props.taskList)}}>Due Today/Tomorrow</button>
          { this.props.taskList && this.props.taskList.length > 0 ? this.props.taskList.map((taskItem) => {
              return <TaskItem key={taskItem.id} item={taskItem}/>
          }) : null}
            </div>

        )
    }
}

const mapStateToProps = (state) => (
    {
        taskList: state.taskList
    }
)
export default connect(mapStateToProps, {filterCompleted, filterDueTodayOrTomorrow,filterOverDue, getTaskList})(TaskList)