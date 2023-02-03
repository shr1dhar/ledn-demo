# rest-api-tsoa-setup
Rest api implementation with  tosa, Typescript, Express, node, and mongo.

<br>

### requirements
- docker & docker-compose
- ports: 3001 27017

<br>

### Instructions to run the app

1. To build the docker image, run the following command from root folder
`docker-compose build`

2. Start the docker using `docker-compose up` , give 2 - 3 mins.

3. After all the containers are up find the `container-id` for mongodb-container using `docker container ls`

4. To load all the test data in to the DB, run 
```
docker exec <container-id> mongoimport --host mongodb_container --db ledn --collection accounts --type json --file /data/accounts_large.json --jsonArray
```

5. All the available endpoints, request & response parameters are availabe through swagger. Please Go to 
```
http://localhost:3001/docs/
```

<br>

### Test cases
A small subset of test cases are in `/app/tests` folder. <br/>
To run them make sure the dockers are running, then run the following commands.

1. `cd app`
2. `yarn install`
3. `yarn test`
