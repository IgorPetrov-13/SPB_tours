const usersRoute = require("express").Router();
const { Road } = require("../../db/models");
const verifyAccessToken = require("../../middleware/verifyAccessToken");

usersRoute.get("/:id", verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const roads = await Road.findAll({
      where: { userId: id },
      order: [["id", "ASC"]],
    });
    if (roads.length > 0) {
      res.status(200).json({ message: "success", roads });
    } else {
      res.status(404).json({ message: "ничего не найдено" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = usersRoute;
