// Роуты для пользователя.
const router = require('express').Router();
const {
  getUserID,
  getUsers,
  updateUser,
  updateAvatar,
  getMyProfile,
} = require('../controllers/users');

// Возвращаем всех пользователей
router.get('/users', getUsers);

// Получаем данные пользователя
router.get('/users/me', getMyProfile);

// Возвращаем пользователя по id
router.get('/users/:id', getUserID);

// Обновляем профиль
router.patch('/users/me', updateUser);

// Обновляем аватар
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
