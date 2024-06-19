const prisma = require("../config/prisma");
const { createCustomError } = require("../utils/error");

const getItems = async (req, res, next) => {
  try {
    const items = await prisma.listItem.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json({ items });
  } catch (error) {
    // res.status(500).json({ msg: error.message });
    next(createCustomError("Server Error, Please try again later", 500));
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
    next(createCustomError("Server Error, Please try again later", 500));
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
    next(createCustomError("Server Error, Please try again later", 500));
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
    next(createCustomError("Server Error, Please try again later", 500));
  }
};

module.exports = { getItems, createItem, updateItem, deleteItem };
