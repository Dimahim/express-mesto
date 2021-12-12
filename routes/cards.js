const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  putLike,
  removeLike,
} = require('../controllers/cards');

// Получаем все карточки
router.get('/cards', getCards);

// Создаем карточку
router.post('/cards', createCard);

// Удаляем карточку
router.delete('/cards/:cardId', deleteCard);

// Поставить лайк карточке
router.put('/cards/:cardId/likes', putLike);

// Убрать лайк с карточки
router.delete('/cards/:cardId/likes', removeLike);

module.exports = router;
