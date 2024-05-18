const errorHandler = (err, req, res, next) => {
	let status = err.status || 500;
	let message = err.message || "Something went wrong";
	console.log(err);
	return res.status(status).json({
		message,
	});
};

module.exports = errorHandler;
