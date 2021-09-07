const express = require("express");
const router = express.Router();
const { db_connect, db, characters } = require("../../db_connect/connect");

// middleware para uso desta rota pelo indexjs
router.use((req, res, next) => {
  next();
});

// GET respondendo a req todos os personagens válidos
router.get("/", async (req, res) => {
  await db_connect();
  const getCharacterValid = await characters.find({}).toArray();
  res.send(getCharacterValid);
});

module.exports = router;
