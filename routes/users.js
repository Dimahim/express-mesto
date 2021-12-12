// Роуты для пользователя.
const router = require('express').Router();
const {
  createUser,
  getUserID,
  getUsers,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

// Возвращаем всех пользователей
router.get('/users', getUsers);

// Возвращаем пользователя по id
router.get('/users/:id', getUserID);

// Создаем пользователя
router.post('/users', createUser);

// Обновляем профиль
router.patch('/users/me', updateUser);

// Обновляем аватар
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
