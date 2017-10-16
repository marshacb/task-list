import axios from 'axios' 

export const getTasksApi = () => {
    return axios.get("http://localhost:8080/task_list");
  };

  export const postTaskApi = task => {
    return axios.post("http://localhost:8080/task_list", {
      name: task.name,
      description: task.description,
      due_date: task.dueDate
    });
  };

  export const deleteTaskApi = taskId => {
    return axios.put("http://localhost:8080/delete_task", { id: taskId });
  };

  export const updateTaskApi = taskId => {
    return axios.put("http://localhost:8080/update_task", { id: taskId });
  };
  