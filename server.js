const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/connect");
const router = require("./routes/router");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// middlewares
app.use(
	cors({
		origin: [process.env.CLIENT_URL],
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: [
			"X-CSRF-Token",
			"X-Requested-With",
			"Accept",
			"Accept-Version",
			"Content-Length",
			"Content-MD5",
			"Content-Type",
			"Date",
			"X-Api-Version",
		],
	})
);
app.use(express.json());

// routes
app.use("/api/v1/items", router);
app.use(notFound);
app.use(errorHandler);

// start server
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on port ${process.env.PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
