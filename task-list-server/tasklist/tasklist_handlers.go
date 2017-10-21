package tasklist

import (
	"encoding/json"
	"log"
	"net/http"
	"task-list/task-list-server/helpers"
)

type TaskENV struct {
	TaskList
}

func CreateTaskListENV() *TaskENV {
	return &TaskENV{
		TaskList: TaskList{},
	}
}

func (env *TaskENV) GetTaskListHandler(w http.ResponseWriter, r *http.Request) {
	helpers.RespondWithJSON(w, http.StatusOK, env.TaskList)
}

func (env *TaskENV) AddTaskItemHandler(w http.ResponseWriter, r *http.Request) {
	var taskListData TaskListPostData

	err := json.NewDecoder(r.Body).Decode(&taskListData)
	if err != nil {
		log.Println("AddTaskItemHandler Error: ", err)
		helpers.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	defer r.Body.Close()

	updatedTaskList := env.TaskList.AddTaskItem(taskListData.Name, taskListData.Description, taskListData.DueDate, false)

	helpers.RespondWithJSON(w, http.StatusOK, updatedTaskList)
}

func (env *TaskENV) RemoveTaskItemHandler(w http.ResponseWriter, r *http.Request) {
	var taskListData TaskDeleteData

	err := json.NewDecoder(r.Body).Decode(&taskListData)
	if err != nil {
		log.Println("RemoveTaskItemHandler Error: ", err)
		helpers.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	updatedTaskList := env.TaskList.RemoveItemFromTaskList(taskListData.TaskItemId)

	helpers.RespondWithJSON(w, http.StatusOK, updatedTaskList)
}

func (env *TaskENV) UpdateTaskHandler(w http.ResponseWriter, r *http.Request) {

	var taskData struct {
		Id int `json:"id"`
	}

	err := json.NewDecoder(r.Body).Decode(&taskData)
	if err != nil {
		log.Println("UpdateTaskHandler Error: ", err)
		helpers.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	updatedTaskList := env.TaskList.UpdateTask(taskData.Id)

	helpers.RespondWithJSON(w, http.StatusOK, updatedTaskList)
}
