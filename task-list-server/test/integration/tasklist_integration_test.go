package integration_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"task-list/task-list-server/tasklist"
	"time"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("TaskListIntegration", func() {
	Context("GET /task_list", func() {
		It("Returns a list of all tasks", func() {
			taskListData := tasklist.TaskListPostData{"Task1", "go to store", time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)}

			body, _ := json.Marshal(taskListData)
			_, err1 := http.Post(baseURL+"/task_list", "application/json", bytes.NewReader(body))
			Expect(err1).NotTo(HaveOccurred())

			res, err := http.Get(baseURL + "/task_list")
			Expect(err).NotTo(HaveOccurred())

			var taskList tasklist.TaskList
			err = json.NewDecoder(res.Body).Decode(&taskList)
			defer res.Body.Close()

			// Expect(len(taskList)).To(Equal(8))
			Expect(taskList[0].Name).To(Equal("Task1"))
			Expect(len(taskList)).To(Equal(1))

		})
	})
	Context("POST /task_list", func() {
		It("adds a task to a task list", func() {
			taskListData := tasklist.TaskListPostData{"Task1", "go to store", time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)}

			body, _ := json.Marshal(taskListData)
			res, err := http.Post(baseURL+"/task_list", "application/json", bytes.NewReader(body))
			Expect(err).NotTo(HaveOccurred())

			var taskList tasklist.TaskList
			err = json.NewDecoder(res.Body).Decode(&taskList)
			Expect(err).NotTo(HaveOccurred())

			Expect(taskList[0].Description).To(Equal("go to store"))
			Expect(taskList[0].Name).To(Equal("Task1"))
			Expect(taskList[0].Completed).To(Equal(false))
		})
	})
	Context("PUT /task", func() {
		It("updates completed state a task by specified id", func() {
			taskListData := tasklist.TaskListPostData{"Task1", "go to store", time.Date(2016, time.May, 19, 1, 2, 3, 4, time.UTC)}

			body1, _ := json.Marshal(taskListData)
			_, err1 := http.Post(baseURL+"/task_list", "application/json", bytes.NewReader(body1))
			Expect(err1).NotTo(HaveOccurred())

			taskData := struct {
				Id int `json:"id"`
			}{Id: 0}

			client := &http.Client{}
			body, _ := json.Marshal(taskData)
			req, _ := http.NewRequest(http.MethodPut, baseURL+"/update_task", bytes.NewReader(body))
			res, err := client.Do(req)

			Expect(err).NotTo(HaveOccurred())

			var taskList tasklist.TaskList
			err = json.NewDecoder(res.Body).Decode(&taskList)
			Expect(err).NotTo(HaveOccurred())
			Expect(taskList[0].Completed).To(Equal(true))
		})
	})

	Context("PUT /task", func() {
		It("updates completed state of a task by specified id", func() {
			taskData := struct {
				Id int `json:"id"`
			}{Id: 2}

			client := &http.Client{}
			body, _ := json.Marshal(taskData)
			req, _ := http.NewRequest(http.MethodPut, baseURL+"/delete_task", bytes.NewReader(body))
			res, err := client.Do(req)

			Expect(err).NotTo(HaveOccurred())

			var taskList tasklist.TaskList
			err = json.NewDecoder(res.Body).Decode(&taskList)
			Expect(err).NotTo(HaveOccurred())

			Expect(len(taskList)).To(Equal(2))
		})
	})
})
