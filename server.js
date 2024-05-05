const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/connect");
const router = require("./routes/router");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/items", router);

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
