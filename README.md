Boilerplate NodeJS API - by Fernando Calixto

Create a local DB using docker to test the api:

```
$ sudo docker run --name nodeapi -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=nodeapi -e POSTGRES_USER=nodeapi -p 5432:5432 -d postgres
```

Remember to open the "database.js" file and put the database connection info before running