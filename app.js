const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routerUser = require('./routes/users');

const app = express();
const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb').catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routerUser);

app.listen(PORT, () => {
  console.log(`Projeсt is listenning on port ${PORT}`);
});
