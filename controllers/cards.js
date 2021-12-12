const Card = require('../models/card');

// Получаем все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch((err) => res.status(500).send({ massage: `На сервере произошла ошибка ${err}` }));
};

// Создаем карточку
module.exports.createCard = (req, res) => {
  console.log(req.body);
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ body: card }))
    .catch((err) => res.status(400).send({ massage: `Переданы некорректные данные ${err}` }));
};

// Удаляем карточку
module.exports.deleteCard = (req, res) => {
  const owner = req.user._id;
  Card.findOne({ _id: req.params.cardId })
    .then((card) => {
      if (!card.owner.equals(owner)) {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        Card.deleteOne(card)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }));
      }
    })
    .catch((e) => console.log(e));
};

// Ставим лайк карочке
module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      res.status(200).send({ data: card });
    })
    .catch((e) => console.log(e));
};

// Удаляем лайк
module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(200).send({ data: card });
    })
    .catch((e) => console.log(e));
};
