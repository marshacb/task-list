package tasklist

import (
	"log"
	"time"
)

type TaskItem struct {
	Id          int       `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	DueDate     time.Time `json:"due_date"`
	Completed   bool      `json:"completed"`
}

type TaskList []TaskItem

type TaskListPostData struct {
	Name        string    `json:"name"`
	Description string    `json:"description"`
	DueDate     time.Time `json:"due_date"`
}

type TaskDeleteData struct {
	TaskItemId int `json:"id"`
}

func (taskList *TaskList) AddTaskItem(name, description string, dueDate time.Time, completed bool) TaskList {
	var taskID int
	if len(*taskList) > 0 {
		taskID = (*taskList)[len(*taskList)-1].Id + 1
	} else {
		taskID = 0
	}

	taskItem := TaskItem{Id: taskID, Name: name, Description: description, DueDate: dueDate, Completed: completed}
	*taskList = append(*taskList, taskItem)

	return *taskList
}

func (taskList *TaskList) RemoveItemFromTaskList(itemToRemoveId int) TaskList {
	for idx, taskItem := range *taskList {
		if taskItem.Id == itemToRemoveId {
			*taskList = append((*taskList)[:idx], (*taskList)[idx+1:]...)
			return *taskList
		}
	}
	log.Printf("No to do item with id %v found", itemToRemoveId)
	return *taskList
}

func (taskList *TaskList) UpdateTask(taskId int) TaskList {
	for _, item := range *taskList {
		if item.Id == taskId {
			(*taskList)[item.Id].Completed = true
		}
	}

	return *taskList
}
