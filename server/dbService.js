import 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

// get all users
export const getAllData = (request, response) => {
  pool.query('SELECT * FROM names', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// get user by id
export const searchByName = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM names WHERE name = ?', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// post a new user
export const insertNewName = (request, response) => {
  const name = request.body;
  const dateAdded = new Date();

  pool.query(
    'INSERT INTO names (name, date_added) VALUES (?,?)',
    [name, dateAdded],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

// PUT updated data in an existing user

export const updateNameById = (request, response) => {
  const id = parseInt(request.params.id);
  const name = request.body;

  pool.query(
    'UPDATE names SET name = ? WHERE id = ?',
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

// delete a user
export const deleteRowById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM names WHERE id = ?', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};
