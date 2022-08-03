## Start

Create a .env file and add DATABASE_URL and then start the application

```
npm start
```

## DB

You can setup database on elephantsql.com

## SQL commands

```
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    content text NOT NULL,
    important boolean,
    date time
);
insert into notes (content, important) values ('Relational databases rule the world', true);
insert into notes (content, important) values ('MongoDB is webscale', false);
select * from notes;
drop table notes;
```
