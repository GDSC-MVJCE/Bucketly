const mongoose = require("mongoose");
// const validateURL = require("../utils/validateURL");
const { Schema } = mongoose;

const ListItemSchema = new Schema(
	{
		place: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		plan: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		link: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // adds timestamps to the schema
	}
);

// utility function to validate URL
const validateURL = async (field) => {
	ListItemSchema.path(field).validate((val) => {
		urlRegex =
			/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
		return urlRegex.test(val);
	}, "Invalid URL.");
};

validateURL("image");
validateURL("link");

module.exports = mongoose.model("ListItem", ListItemSchema);
