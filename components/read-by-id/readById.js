const express = require("express");
const router = express.Router();

// importando a conexão com o banco e seus atributos
const {
  db_connect,
  db,
  characters,
  ObjectId,
} = require("../../db_connect/connect");

// middleware para uso desta rota pelo indexjs
router.use((req, res, next) => {
  next();
});

// GET /:id rota para o requisão por id
router.get("/:id", async (req, res) => {
  await db_connect(); 
  const id = req.params.id;
  const character = await characters.findOne({ _id: ObjectId(id) });
  if (!character) {
    res.status(404).send({ error: "Personagem não existe." });
    return;
  }
  res.send(character);
});

module.exports = router;
