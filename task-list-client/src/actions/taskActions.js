import * as types from "./types";
import * as taskApi from '../api/taskApi'

export const getTaskList = () => async dispatch => {
  try {
    const res = await taskApi.getTasksApi();
    dispatch({ type: types.GET_TASK_LIST_SUCCESS, payload: res.data });
  } catch (err) {
    console.log("getTaskList error: ", err);
  }
};


export const postTask = task => async dispatch => {
  try {
    const res = await taskApi.postTaskApi(task);
    dispatch({ type: types.POST_TASK_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = (tasks, taskId) => async dispatch => {
  try {
    const res = await taskApi.deleteTaskApi(tasks, taskId);
    dispatch({ type: types.DELETE_TASK_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = taskId => async dispatch => {
  try {
    const res = await taskApi.updateTaskApi(taskId);
    dispatch({ type: types.UPDATE_TASK_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const updateFormState = formState => dispatch => {
  dispatch({ type: types.UPDATE_FORM_SUCCESS, payload: { formState } });
};

export const filterCompleted = tasks => dispatch => {
  const filteredTasks = tasks.filter(task => {
    return task.completed
    }
  );

  dispatch({type: types.FILTER_TASK_SUCCESS, payload: filteredTasks})
};


export const filterDueTodayOrTomorrow = tasks => dispatch => {
  let today = new Date()
  let tomorrow = new Date()
  tomorrow.setDate(today.getDate()+1);
  const filteredTasks = tasks.filter(task => {
    const taskDueDate = new Date(task.due_date)
    return taskDueDate.getDate() === today.getDate() || taskDueDate.getDate() === tomorrow.getDate()
    }
  )
  dispatch({type: types.FILTER_TASK_SUCCESS, payload: filteredTasks})
};

export const filterOverDue = tasks => dispatch => {
  let today = new Date()
  const filteredTasks = tasks.filter(task => {
    const taskDueDate = new Date(task.due_date)
    return taskDueDate.getDate() < today.getDate()
    }
  )
  dispatch({type: types.FILTER_TASK_SUCCESS, payload: filteredTasks})
};