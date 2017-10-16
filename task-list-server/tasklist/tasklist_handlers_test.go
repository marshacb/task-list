package tasklist_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	. "task-list/task-list-server/tasklist"
	"time"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Handlers", func() {
	Context("GetTaskListHandler", func() {
		It("Returns a list of all task items", func() {
			req, _ := http.NewRequest("GET", "/task", nil)

			recorder := httptest.NewRecorder()
			env := TaskENV{TaskList{
				TaskItem{Id: 1,
					Name:        "Task1",
					Description: "Go home",
					DueDate:     time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)}}}
			handler := http.HandlerFunc(env.GetTaskListHandler)
			handler.ServeHTTP(recorder, req)

			var response TaskList

			err := json.NewDecoder(recorder.Body).Decode(&response)
			Expect(err).NotTo(HaveOccurred())

			Expect(recorder.Code).To(Equal(http.StatusOK))
			Expect(response[0].Id).To(Equal(1))
			Expect(response[0].Name).To(Equal("Task1"))
			Expect(response[0].Description).To(Equal("Go home"))
			Expect(response[0].DueDate).To(Equal(time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)))
		})
	})

	Context("AddTaskItemHandler", func() {
		It("Adds a task item to list", func() {
			taskPostData := TaskListPostData{Name: "Task3", Description: "Play ball", DueDate: time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)}
			body, _ := json.Marshal(taskPostData)
			req, _ := http.NewRequest("POST", "/task_list", bytes.NewReader(body))
			env := TaskENV{TaskList{TaskItem{Id: 0, Name: "Task1", Description: "Go to store", DueDate: time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)},
				TaskItem{Id: 1, Name: "Task2", Description: "Go home", DueDate: time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)}}}
			recorder := httptest.NewRecorder()
			handler := http.HandlerFunc(env.AddTaskItemHandler)
			handler.ServeHTTP(recorder, req)

			var response TaskList

			err := json.NewDecoder(recorder.Body).Decode(&response)
			Expect(err).NotTo(HaveOccurred())

			Expect(recorder.Code).To(Equal(http.StatusOK))
			Expect(response[0].Name).To(Equal("Task1"))
			Expect(response[1].DueDate).To(Equal(time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)))
			Expect(response[2].Description).To(Equal("Play ball"))
			Expect(len(response)).To(Equal(3))
		})
	})

	Context("RemoveTaskItemHandler", func() {
		It("Removes a task item from list", func() {
			taskDeleteData := TaskDeleteData{TaskItemId: 0}
			body, _ := json.Marshal(taskDeleteData)
			req, _ := http.NewRequest("PUT", "/delete_task", bytes.NewReader(body))
			env := TaskENV{TaskList{TaskItem{Id: 0, Name: "Task1", Description: "Go to store", DueDate: time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)},
				TaskItem{Id: 1, Name: "Task2", Description: "Go home", DueDate: time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)}}}
			recorder := httptest.NewRecorder()
			handler := http.HandlerFunc(env.RemoveTaskItemHandler)
			handler.ServeHTTP(recorder, req)

			var response TaskList

			err := json.NewDecoder(recorder.Body).Decode(&response)
			Expect(err).NotTo(HaveOccurred())

			Expect(recorder.Code).To(Equal(http.StatusOK))
			Expect(response[0].Name).To(Equal("Task2"))
			Expect(len(response)).To(Equal(1))
		})
	})

	Context("UpdateTaskHandler", func() {
		It("Updates a task item in list", func() {
			taskData := struct {
				Id int `json:"id"`
			}{Id: 0}
			body, _ := json.Marshal(taskData)
			req, _ := http.NewRequest("PUT", "/update_task", bytes.NewReader(body))
			env := TaskENV{TaskList{TaskItem{Id: 0, Name: "Task1", Description: "Go to store", DueDate: time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)},
				TaskItem{Id: 1, Name: "Task2", Description: "Go home", DueDate: time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)}}}
			recorder := httptest.NewRecorder()
			handler := http.HandlerFunc(env.UpdateTaskHandler)
			handler.ServeHTTP(recorder, req)

			var response TaskList

			err := json.NewDecoder(recorder.Body).Decode(&response)
			Expect(err).NotTo(HaveOccurred())

			Expect(recorder.Code).To(Equal(http.StatusOK))
			Expect(response[0].Completed).To(Equal(true))
			Expect(len(response)).To(Equal(2))
		})
	})
})
