## Rss Reader service 
The http service exposes a Rest Api which can be used with the following endpoints:

/api/v1/rss: POST accepts array of rss urls for parsing
/api/v1/rss: GET returns array of rss items for the urls stored into the service
/api/v1/rssUrls: GET returns array of rss urls stored into the service

To run the service locally use the following command:
go run .\service\main.go