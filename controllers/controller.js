const ListItems = require("../schema/ListItem");

const getItems = async (req, res) => {
	try {
		const items = await ListItems.find();
		res.status(200).json({ items });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const createItem = async (req, res) => {
	try {
		const { place, location, plan, image, link } = req.body;
		const item = await ListItems.create({
			place,
			location,
			plan,
			image,
			link,
		});
		res.status(201).json({ item });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const updateItem = async (req, res) => {
	try {
		const { id } = req.params;
		const { place, location, plan, image, link, date } = req.body;
		const item = await ListItems.findByIdAndUpdate(
			{ _id: id },
			{ place, location, plan, image, link, date },
			{ new: true }
		);
		res.status(200).json({ item });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const deleteItem = async (req, res) => {
	try {
		const { id } = req.params;
		await ListItems.findByIdAndDelete({ _id: id });
		res.status(200).json({ msg: "Item deleted" });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

module.exports = { getItems, createItem, updateItem, deleteItem };
