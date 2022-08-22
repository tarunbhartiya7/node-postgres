## Start

`docker compose up -d` to start the database and then `npm start` to start the service.

`docker compose down` to stop and remove the databases.

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

## Sequilize

```
Simple search using AND and =

Model.findAll({
  where: {
    attr1: 42,
    attr2: 'cake'
  }
})
WHERE attr1 = 42 AND attr2 = 'cake'
Using greater than, less than etc.


Model.findAll({
  where: {
    attr1: {
      gt: 50
    },
    attr2: {
      lte: 45
    },
    attr3: {
      in: [1,2,3]
    },
    attr4: {
      ne: 5
    }
  }
})
WHERE attr1 > 50 AND attr2 <= 45 AND attr3 IN (1,2,3) AND attr4 != 5

Queries using OR

Model.findAll({
  where: Sequelize.and(
    { name: 'a project' },
    Sequelize.or(
      { id: [1,2,3] },
      { id: { gt: 10 } }
    )
  )
})
WHERE name = 'a project' AND (id` IN (1,2,3) OR id > 10)
```
