const mongoose = require("mongoose");

const connectDB = async (uri) => {
	return await mongoose.connect(uri, {
		dbName: process.env.MONGO_DB,
	});
};

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
	console.log(error);
});

mongoose.connection.on("disconnected", () => {
	console.log("Disconnected from MongoDB");
});

process.on("SIGINT", async () => {
	await mongoose.connection.close();
	process.exit(0);
});

module.exports = connectDB;
