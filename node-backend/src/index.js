/* eslint-disable no-console */
const express = require('express');
const ENV = require('./environments');
const router = require('./routes');
const { sayHello } = require('./controllers/hello');

const app = express();

const { PORT } = ENV;

app.use(express.json());
app.get('/', sayHello);
app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
