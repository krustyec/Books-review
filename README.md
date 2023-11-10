To start-up the project follow these commands:

1. "npm i" <- To install the dependencies >
2. "nodemon index.js" <- To run the server >
3. Type the adress in your browser: "http://localhost:3000/"

SQL Commands 

To initialize principal table
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  isbn INT UNIQUE,
  summary TEXT
);