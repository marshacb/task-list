Getting Started
========================
Set up GOPATH.

------- 
Inside of task-list-server directory run the go build command.
Once the binary is built use the ./task-list-server command to execute the program.


Testing
=============
To run Api tests install ginkgo and gomega on your machine.
Once installed run the gingko -r command inside of the task-list-server root directory.

API
=============
Simple api with 4 endpoints

GET to /task_list returns any tasks already created by user
--------------
POST to /task_list will create a task based on passed in arguments
--------------
PUT to /update_task updates the completed state of a task
--------------
PUT to /delete_task will delete a specified task based on id