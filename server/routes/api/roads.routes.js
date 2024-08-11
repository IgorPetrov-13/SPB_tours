const roadsRoute = require("express").Router();
const { Road } = require("../../db/models");
const verifyAccessToken = require("../../middleware/verifyAccessToken");

roadsRoute.get("/", async (req, res) => {
  try {
    const roads = await Road.findAll({ order: [["id", "ASC"]] });
    if (roads.length > 0) {
      res.status(200).json({ message: "success", roads });
    } else {
      res.status(404).json({ message: "ничего не найдено" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

roadsRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const road = await Road.findOne({ where: { id } });
    if (road) {
      return res.status(200).json({ message: "success", road });
    } else {
      return res.status(404).json({ message: "ничего не найдено" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

roadsRoute.post("/", verifyAccessToken, async (req, res) => {
  try {
    const { title, length, mapLink, description, userId } = req.body;
    if (!title || !length || !mapLink || !userId || !description) {
      return res
        .status(400)
        .json({ message: "не хватает данных для публикации записи" });
    }
    const newRoad = await Road.create({
      title,
      length,
      mapLink,
      description,
      userId,
    });
    res.status(201).json({ message: "запись добавлена", newRoad });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

roadsRoute.delete("/:roadId", verifyAccessToken, async (req, res) => {
  const { roadId } = req.params;
  try {
    const deletedRoad = await Road.destroy({ where: { id: roadId } });
    if (deletedRoad === 0) {
      return res.status(404).json({ message: "Road not found" });
    } else {
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

roadsRoute.put("/:roadId", verifyAccessToken, async (req, res) => {
  const { roadId } = req.params;
  const { title, length, mapLink, description, userId } = req.body;
  if (!title || !length || !mapLink || !userId || !description) {
    return res
      .status(400)
      .json({ message: "не хватает данных для обновления записи" });
  }
  try {
    const road = await Road.findOne({ where: { id: roadId } });
    if (!road) {
      return res.status(404).json({ message: "Запись не найдена" });
    } else {
      await Road.update(req.body, { where: { id: roadId } });
      const updatedRoad = await Road.findOne({ where: { id: roadId } });

      //!===========
      console.log("updatedRoad", updatedRoad);
      //!===========

      res.status(200).json({ message: "success", updatedRoad });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = roadsRoute;
