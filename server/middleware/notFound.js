const createCustomError = require("../utils/error");

const notFound = (req, res, next) => {
  next(createCustomError("Page not found", 404));
};

module.exports = notFound;
