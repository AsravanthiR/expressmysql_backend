import 'dotenv/config.js';
import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DB_CONNECTIONSTRING,
});

// get all users
export const getAllData = (request, response) => {
  pool.query('SELECT * FROM names', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json({ data: results.rows });
  });
};

// get user by name
export const searchByName = (request, response) => {
  //const id = parseInt(request.params.id);
  const name = request.params.username;

  pool.query(
    'SELECT * FROM names WHERE username = $1',
    [name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json({ data: results.rows });
    }
  );
};

// post a new user
export const insertNewName = (request, response) => {
  const { name } = request.body;
  const dateAdded = new Date();

  pool.query(
    'INSERT INTO names (username, date_added) VALUES ($1,$2)',
    [name, dateAdded],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ data: results.rows });
    }
  );
};

// PUT updated data in an existing user

export const updateNameById = (request, response) => {
  const id = parseInt(request.params.id);
  const { name } = request.body;

  pool.query(
    'UPDATE names SET username = $1 WHERE id = $2',
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json({ data: results.rows });
    }
  );
};

// delete a user
export const deleteRowById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM names WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(`User deleted`);
  });
};
