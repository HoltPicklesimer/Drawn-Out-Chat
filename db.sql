CREATE TABLE users
( id SERIAL PRIMARY KEY
, username VARCHAR(100) UNIQUE NOT NULL
, password VARCHAR(100) NOT NULL);

CREATE TABLE chat_rooms
( id SERIAL PRIMARY KEY
, name VARCHAR(100) NOT NULL
, admin_id INT NOT NULL REFERENCES users(id)
, image_data TEXT NOT NULL);

CREATE TABLE chat_users
( id SERIAL NOT NULL
, user_id INT NOT NULL REFERENCES users(id)
, chat_id INT NOT NULL REFERENCES chat_rooms(id));

CREATE TABLE comments
( id SERIAL NOT NULL
, chat_id INT NOT NULL REFERENCES chat_rooms(id)
, user_id INT NOT NULL REFERENCES users(id)
, content TEXT NOT NULL
, date_published DATE NOT NULL);

INSERT INTO users
( username, password)
VALUES
( 'Bob', '123');

INSERT INTO chat_rooms
( admin_id, image_data)
VALUES
( 1, '{1, 2, 3}');

INSERT INTO chat_users
( user_id, chat_id)
VALUES
( 1, 1);

INSERT INTO comments
( chat_id, user_id, content, date_published)
VALUES
( 1, 1, 'Hello', current_timestamp);