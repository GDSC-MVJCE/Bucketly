const Router = require("express").Router();

const {
	getItems,
	createItem,
	updateItem,
	deleteItem,
} = require("../controllers/controller");

Router.get("/", getItems);
Router.post("/", createItem);
Router.put("/:id", updateItem);
Router.delete("/:id", deleteItem);

module.exports = Router;
