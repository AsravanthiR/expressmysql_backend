import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const port = 5000;
import {
  getAllData,
  searchByName,
  insertNewName,
  updateNameById,
  deleteRowById,
} from './dbService.js';

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' });
// });

app.get('/getAll', getAllData);
app.get('/search/:name', searchByName);
app.post('/insert', insertNewName);
app.put('/update', updateNameById);
app.delete('/delete/:id', deleteRowById);

app.listen(port, () => {
  console.log(`App running.`);
});
