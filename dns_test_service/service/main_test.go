package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

var a app

func TestMain(m *testing.M) {
	a = app{}
	a.InitializeAPI()
	code := m.Run()
	os.Exit(code)
}

func TestPost(t *testing.T) {
	cnameRequest := []byte(`{ "domainName": "abv.bg",
	"cname": "abv",
	"cnameTarget": "194.153.145.104",
	"ttl": 3600}`)
	req, _ := http.NewRequest("POST", "/api/dns/", bytes.NewBuffer(cnameRequest))
	response := executeRequest(req)
	assert.Equal(t, http.StatusOK, response.Code)
}

func executeRequest(req *http.Request) *httptest.ResponseRecorder {
	rr := httptest.NewRecorder()
	a.Router.ServeHTTP(rr, req)

	return rr
}

func checkResponseCode(t *testing.T, expected, actual int) {
	if expected != actual {
		t.Errorf("Expected response code %d. Got %d\n", expected, actual)
	}
}
