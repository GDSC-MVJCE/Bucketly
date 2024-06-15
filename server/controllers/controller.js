const prisma = require("../config/prisma");

const getItems = async (req, res) => {
	try {
		const items = await prisma.listItem.findMany();
		res.status(200).json({ items });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const createItem = async (req, res) => {
	try {
		const { place, location, plan, image, link, date } = req.body;
		const d = new Date(date);
		let isoDate = d.toISOString();
		const item = await prisma.listItem.create({
			data: {
				place,
				location,
				plan,
				image,
				link,
				date: isoDate,
			},
		});
		if (!item) {
			res.status(400).json({ msg: "Item not created" });
		}
		res.status(201).json({ item });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const updateItem = async (req, res) => {
	try {
		const { id } = req.params;
		const { place, location, plan, image, link, date } = req.body;
		d = new Date(date);
		isoDate = d.toISOString();
		const item = await prisma.listItem.update({
			where: {
				id: id,
			},
			data: {
				place,
				location,
				plan,
				image,
				link,
				date: isoDate,
			},
		});
		res.status(200).json({ item });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const deleteItem = async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.listItem.delete({
			where: {
				id: id,
			},
		});
		res.status(200).json({ msg: "Item deleted" });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

module.exports = { getItems, createItem, updateItem, deleteItem };
