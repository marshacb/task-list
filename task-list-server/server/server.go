package server

import (
	"log"
	"net/http"
	"os"
	"task-list/task-list-server/router"
)

func StartServer() {

	r := router.InitializeRouter()

	var port string
	port = os.Getenv("PORT")
	if port == "" {
		log.Println("No port set. Setting port to 8080.")
		port = "8080"
	}

	log.Printf("Starting server on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
