Boilerplate NodeJS API - by Fernando Calixto
(Current Stack: ExpressJS, Sequelize ORM and PostgreSQL)

Follow the steps below to run and test the API:

1 - Create a local postgres DB using docker

```
$ sudo docker run --name nodeapi -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=nodeapi -e POSTGRES_USER=nodeapi -p 5432:5432 -d postgres
```

PS: If you rather, in the "database.json" file, you can setup different database connections before running (development, test and production).

2 - After creating the database and starting the docker container, install the dependencies using "yarn" or "npm"

3 - Run the migrations

```
$ npx sequelize-cli db:migrate
```

4 - Now, you can run the server either in development mode using "yarn/npm dev" or in production mode using "yarn/npm start".