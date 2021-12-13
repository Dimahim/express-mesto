const User = require('../models/user');

// Поучаем всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ massage: `На сервере произошла ошибка ${err}` }));
};

// Получаем пользователя по id
module.exports.getUserID = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Невалидный id  ${err}` });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка ${err}` });
      }
    });
};

// Создаем пользователя
module.exports.createUser = (req, res) => {
  console.log(req.body);
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные ${err}` });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка ${err}` });
      }
    });
};

// Обновляем профиль
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные ${err}` });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка ${err}` });
      }
    });
};

// Обновляем аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные ${err}` });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка ${err}` });
      }
    });
};
