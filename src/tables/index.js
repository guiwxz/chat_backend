import client from '../database/index.js';

const query = `
  CREATE TABLE users (
    codigo serial,
    nickname varchar(20),
    senha varchar(15),

    primary key(codigo)
  );

  CREATE TABLE messages (
    codigo serial,
    message varchar,
    cod_user integer,

    primary key(codigo),
    foreign key(cod_user) references users(codigo)
  );
`

client.query(query)
  .then(res => {
    console.log('Table is successfully created');
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    client.end();
  });