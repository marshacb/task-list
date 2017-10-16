package integration_test

import (
	"os"
	"task-list/task-list-server/server"
	"time"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"

	"testing"
)

var (
	baseURL string
)

func TestIntegration(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Integration Suite")
}

var _ = BeforeSuite(func() {
	baseURL = "http://localhost:9090"

	os.Setenv("PORT", "9090")
	os.Setenv("ENV", "TEST")
	go server.StartServer()
	time.Sleep(1 * time.Second)
})
