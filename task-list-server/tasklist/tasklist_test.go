package tasklist_test

import (
	. "task-list/task-list-server/tasklist"
	"time"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("taskList", func() {
	Context("AddTaskItem", func() {
		It("Adds a task item to a task list", func() {
			taskList := TaskList{TaskItem{Id: 0, Name: "Task1", Description: "Go to store", DueDate: time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)}}
			response := taskList.AddTaskItem("Task2", "Go back home", time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC), false)

			Expect(response[1].Name).To(Equal("Task2"))
		})
	})

	Context("RemoveItemFromTaskList", func() {
		It("Removes an item from a task list", func() {
			taskList := TaskList{
				TaskItem{Id: 0, Name: "Task1", Description: "Go to store", DueDate: time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)},
				TaskItem{Id: 1, Name: "Task2", Description: "Go home", DueDate: time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)}}
			response := taskList.RemoveItemFromTaskList(0)

			Expect(response).To(Equal(TaskList{
				TaskItem{
					Id:          1,
					Name:        "Task2",
					Description: "Go home",
					DueDate:     time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)}}))
		})
	})

	Context("UpdateTask", func() {
		It("Updates task item based on passed in task fields", func() {
			taskId := 0

			taskList := TaskList{
				TaskItem{Id: 0, Name: "Task1", Description: "Go to store", DueDate: time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)},
				TaskItem{Id: 1, Name: "Task2", Description: "Go home", DueDate: time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)}}
			response := taskList.UpdateTask(taskId)

			Expect(response[0]).To(Equal(TaskItem{Id: 0, Name: "Task1", Description: "Go to store", DueDate: time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC), Completed: true}))
		})
	})
})
