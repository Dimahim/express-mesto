const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');

const app = express();
const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb').catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '61b60851a9eb0f9541dfd4ef',
  };

  next();
});

// подключаем роуты ользователя
app.use('/', routerUser);

// получаем роуты карточек
app.use('/', routerCards);

app.listen(PORT, () => {
  console.log(`Projeсt is listenning on port ${PORT}`);
});
