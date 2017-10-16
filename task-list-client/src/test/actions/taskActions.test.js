import { shallow } from "enzyme";
import * as actions from "../../actions/taskActions";
import * as taskApi from "../../api/taskApi";

describe("taskActions", () => {
  describe("getTaskLsit", () => {
    it("makes an api call to retrieve all tasks", async () => {
      const mockDispatch = jest.fn();
      const mockGetTasksApi = jest.fn();
      mockGetTasksApi.mockReturnValue(Promise.resolve({ task: "taskData" }));
      taskApi.getTasksApi = mockGetTasksApi;

      await actions.getTaskList()(mockDispatch);

      expect(mockDispatch).toHaveBeenCalled();
      expect(mockGetTasksApi).toBeCalledWith();
    });
  });

  describe("postTask", () => {
    it("makes an api call to post a new task", async () => {
      const mockDispatch = jest.fn();
      const mockPostTaskApi = jest.fn();
      mockPostTaskApi.mockReturnValue(
        Promise.resolve({ data: { task: "task1" } })
      );
      taskApi.postTaskApi = mockPostTaskApi;

      await actions.postTask("task")(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({
        payload: { task: "task1" },
        type: "POST_TASK_SUCCESS"
      });
      expect(mockPostTaskApi).toHaveBeenCalledWith("task");
    });
  });

  describe("deleteTask", () => {
    it("makes an api call to delete a task from a list of tasks", async () => {
      const mockDispatch = jest.fn();
      const mockDeleteTaskApi = jest.fn();
      mockDeleteTaskApi.mockReturnValue(
        Promise.resolve({ data: { task1: "task" } })
      );
      taskApi.deleteTaskApi = mockDeleteTaskApi;

      await actions.deleteTask("tasks", 0)(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({
        payload: { task1: "task" },
        type: "DELETE_TASK_SUCCESS"
      });
      expect(mockDeleteTaskApi).toHaveBeenCalledWith("tasks", 0);
    });
  });

  describe("updateTask", () => {
    it("makes an api call to update the completed status of a task", async () => {
      const mockDispatch = jest.fn();
      const mockUpdateTaskApi = jest.fn();
      mockUpdateTaskApi.mockReturnValue(
        Promise.resolve({ data: { task1: "task" } })
      );
      taskApi.updateTaskApi = mockUpdateTaskApi;
      await actions.updateTask(0)(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({
        payload: { task1: "task" },
        type: "UPDATE_TASK_SUCCESS"
      });
      expect(mockUpdateTaskApi).toHaveBeenCalledWith(0);
    });
  });

  describe("updateFormState", () => {
    it("updates the form state", () => {
        const mockDispatch = jest.fn()
        const formState = {taskDescription: "the description"}
        const action = actions.updateFormState(formState)(mockDispatch)

        expect(mockDispatch).toHaveBeenCalledWith({"payload": {"formState": {"taskDescription": "the description"}}, "type": "UPDATE_FORM_SUCCESS"})
    });
  });

  describe('filterCompleted', () => {
      it('filters all tasks with which have been completed', () => {
          const tasks = [{task1: {completed: false}}, 
       {task2: {completed: true}},
          {task3: {completed: false}},
          {task4: {completed: true}}
          ]

        const mockDispatch = jest.fn()

        const filterCompleted = actions.filterCompleted(tasks)(mockDispatch)

        expect(mockDispatch).toHaveBeenCalledWith({"payload": [], "type": "FILTER_TASK_SUCCESS"})
      })
  })

  describe('filterDueTodayOrTomorrow', () => {
    it('filters all tasks that are due today or tomorrow', () => {
        const tasks = [{task1: {due_date: new Date()}}]

      const mockDispatch = jest.fn()

      const filterCompleted = actions.filterDueTodayOrTomorrow(tasks)(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith({"payload": [], "type": "FILTER_TASK_SUCCESS"})
    })
})


describe('filterOverDue', () => {
    it('filters all tasks that are overdue', () => {
        let overdue = new Date()
        overdue.setDate(new Date().getDate() -10)
        const tasks = [{task1: {due_date: overdue}}]

      const mockDispatch = jest.fn()

      const filterCompleted = actions.filterOverDue(tasks)(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith({"payload": [], "type": "FILTER_TASK_SUCCESS"})
    })
})
});
