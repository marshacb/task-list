package tasklist

import (
	"encoding/json"
	"log"
	"net/http"
)

type TaskENV struct {
	TaskList TaskList
}

func CreateTaskListENV() *TaskENV {
	return &TaskENV{
		TaskList: TaskList{},
	}
}

func (env *TaskENV) GetTaskListHandler(w http.ResponseWriter, r *http.Request) {
	response, _ := json.Marshal(env.TaskList)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(response)
}

func (env *TaskENV) AddTaskItemHandler(w http.ResponseWriter, r *http.Request) {
	var taskListData TaskListPostData

	err := json.NewDecoder(r.Body).Decode(&taskListData)
	if err != nil {
		log.Println("AddTaskItemHandler Error: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Error updating task list"))
		return
	}

	defer r.Body.Close()

	updatedTaskList := env.TaskList.AddTaskItem(taskListData.Name, taskListData.Description, taskListData.DueDate, false)

	response, _ := json.Marshal(updatedTaskList)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(response)
}

func (env *TaskENV) RemoveTaskItemHandler(w http.ResponseWriter, r *http.Request) {
	var taskListData TaskDeleteData

	err := json.NewDecoder(r.Body).Decode(&taskListData)
	if err != nil {
		log.Println("RemoveTaskItemHandler Error: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Error removing task item"))
		return
	}
	updatedTaskList := env.TaskList.RemoveItemFromTaskList(taskListData.TaskItemId)

	response, _ := json.Marshal(updatedTaskList)
	w.WriteHeader(http.StatusOK)
	w.Write(response)
}

func (env *TaskENV) UpdateTaskHandler(w http.ResponseWriter, r *http.Request) {

	var taskData struct {
		Id int `json:"id"`
	}

	err := json.NewDecoder(r.Body).Decode(&taskData)
	if err != nil {
		log.Println("UpdateTaskHandler Error: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Error reading task item"))
		return
	}

	updatedTaskList := env.TaskList.UpdateTask(taskData.Id)

	response, _ := json.Marshal(updatedTaskList)
	w.WriteHeader(http.StatusOK)
	w.Write(response)
}
