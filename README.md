Boilerplate NodeJS API - by Fernando Calixto
Stack: ExpressJS, Sequelize ORM and PostgreSQL.

Create a local postgres DB using docker to test the api:

```
$ sudo docker run --name nodeapi -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=nodeapi -e POSTGRES_USER=nodeapi -p 5432:5432 -d postgres
```

In the "database.json" file, you can setup different database connections before running
(development, test and production)