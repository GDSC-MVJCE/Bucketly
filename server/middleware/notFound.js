const notFound = (req, res, next) => {
	res.status(404).json({ message: "Page does not exist" });
};

module.exports = notFound;
