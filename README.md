# dns-ms
Microservice to add CNAME record to DNS service with specified TTL

# To run the project with containers
Prerequisites:
docker, docker-compose
To run the project with docker \
command: docker-compose up -d --build

# To run the project in dev mode
Prerequisites:
docker, docker-compose
To run the project with docker \
command: docker-compose -f docker-compose.dev.yml up -d

# To run the tests for the node service
Prerequisites: install node, npm, yarn \
command:  \
command: docker-compose -f docker-compose.test.yml up -d
yarn test 

# To run the project manually
Prerequisites: install node, npm, yarn go 1.15 \
command:  \
go run ./dns_test_service/service/main.go \
yarn start 