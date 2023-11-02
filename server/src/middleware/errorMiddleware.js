const errorHandler = (err, req, res, next) => {
	let statusCode;
	if (res.statusCode === 200) {
		statusCode = 500;
	} else {
		statusCode = res.statusCode;
	}

	res.status(statusCode);

	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

export default errorHandler;
