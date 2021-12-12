// Роуты для пользователя.
const router = require('express').Router();
const { createUser, getUserID, getUsers } = require('../controllers/users');

// Возвращаем всех пользователей
router.get('/users', getUsers);

// Возвращаем пользователя по id
router.get('/users/:id', getUserID);

// Создаем пользователя
router.post('/users', createUser);

module.exports = router;
