// Ошибка переданны некорректные данные.

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
