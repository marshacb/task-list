package tasklist_test

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"

	"testing"
)

func TestTasklist(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Tasklist Suite")
}
