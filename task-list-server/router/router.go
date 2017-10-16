package router

import (
	"task-list-server/tasklist"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
)

func InitializeRouter() *chi.Mux {
	taskEnv := tasklist.CreateTaskListENV()

	r := chi.NewRouter()

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT"},
		AllowCredentials: true,
	})
	r.Use(cors.Handler)
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(200 * time.Second))

	r.Get("/task_list", taskEnv.GetTaskListHandler)
	r.Post("/task_list", taskEnv.AddTaskItemHandler)
	r.Put("/update_task", taskEnv.UpdateTaskHandler)
	r.Put("/delete_task", taskEnv.RemoveTaskItemHandler)

	return r
}
