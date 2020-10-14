# dns-ms
Microservice to add CNAME record to DNS service with specified TTL

# To run the project with containers
Prerequisites:
docker, docker-compose \
To run the project with docker \
command: docker-compose up -d --build

# To run the project in dev mode
Prerequisites:
docker, docker-compose \
To run the project with docker \
command: docker-compose -f docker-compose.dev.yml up -d

# To run the tests for the node service
Prerequisites: install node, npm, yarn \
command: docker-compose -f docker-compose.test.yml up -d \
yarn test 

# To run the project manually
Prerequisites: install node, npm, yarn go 1.15 \
command:  \
go run ./dns_test_service/service/main.go \
yarn start 

# Microservice endpoints

localhost:3001/api/v1 - healthcheck \
localhost:3001/api/v1/dns - POST \
expected body: 
```
 { 
    "domainName": "google.com",
	"cname": "google.com",
	"cnameTarget": "194.153.145.104",
	"ttl": 300
}
```
Headers: { Content-Type: application/json }