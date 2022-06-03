import client from '../database/index.js';

const query = `
  CREATE TABLE users (
    codigo serial,
    username varchar(50) CHECK(LENGTH(username) >= 3) unique not null,
    nickname varchar(50),
    password varchar(30) CHECK(LENGTH(password) >= 6) not null,
    date varchar(50) not null,

    primary key(codigo)
  );
`

/**
 * CREATE TABLE messages (
    codigo serial,
    message varchar,
    cod_user integer,

    primary key(codigo),
    foreign key(cod_user) references users(codigo)
  );
 * 
 */

const query2 = `
  CREATE TABLE animeswatching (
    codigo serial,
    name varchar(100) not null,
    description varchar(500),
    ep_counter integer default 1 not null,
    date varchar(50) not null,
    cod_user integer not null,

    primary key(codigo),
    foreign key(cod_user) references users(codigo)
  );

  CREATE TABLE animesended (
    codigo serial,
    name varchar(200) not null,
    description varchar(500),
    ep_counter integer default 1 not null,
    times_watched integer default 1 not null,
    date varchar(50) not null,
    cod_user integer not null,

    primary key(codigo),
    foreign key(cod_user) references users(codigo)
  );

  CREATE TABLE animestowatch (
    codigo serial,
    name varchar(200) not null,
    description varchar(500),
    date varchar(50) not null,
    cod_user integer not null,

    primary key(codigo),
    foreign key(cod_user) references users(codigo)
  );
`

const query3 = `
  
`

client.query(query2)
  .then(res => {
    console.log('Table is successfully created');
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    client.end();
  });