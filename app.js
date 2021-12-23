const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/notFoundError');

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb').catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// временное решение авторизации
// app.use((req, res, next) => {
//   req.user = {
//     _id: '61b60851a9eb0f9541dfd4ef',
//   };

//   next();
// });

// Логин
app.post('/signin', login);
// Создание пользователя
app.post('/signup', createUser);

// подключаем роуты пользователя
app.use('/', auth, routerUser);

// получаем роуты карточек
app.use('/', auth, routerCards);

// обработка несуществующего роута
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// Мидлвэр для обработки ошибок централизоапнно.
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка.'
      : message,
  });
  next();
});

// Слушаем порт
app.listen(PORT, () => {
  console.log(`Projeсt is listenning on port ${PORT}`);
});
