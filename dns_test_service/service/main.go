package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type app struct {
	Router *mux.Router
}

func (a *app) post(w http.ResponseWriter, r *http.Request) {
	cname := Cname{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&cname); err != nil {
		respondWithJSON(w, http.StatusBadRequest, false)
		return
	}
	defer r.Body.Close()
	respondWithJSON(w, http.StatusOK, true)
}

// InitializeApi starts the rest API
func (a *app) InitializeAPI() {
	a.Router = mux.NewRouter()
	api := a.Router.PathPrefix("/api/dns").Subrouter()
	api.HandleFunc("/", a.post).Methods(http.MethodPost)
}

func (a *app) Run(addr string) {
	log.Fatal(http.ListenAndServe(addr, a.Router))
}

func main() {
	a := app{}
	a.InitializeAPI()
	a.Run(":8080")
}

func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	if response != nil {
		w.Write(response)
	} else {
		w.Write([]byte(""))
	}
}

// Cname type for dns record
type Cname struct {
	DomainName  string `json:"domainName"`
	Cname       string `json:"cname"`
	CnameTarget string `json:"cnameTarget"`
	TTL         int    `json:"ttl"`
}
