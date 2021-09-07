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

// POST /characters cria um personagem
router.post("/", async (req, res) => {
  await db_connect();
  const character = req.body;

  if (!character || !character.nome || !character.imagemUrl) {
    res.status(400).send({
      error:
        "Personagem inválido. Certifique-se que preencheu os campos solicitados.",
    });
    return;
  }

  const result = await characters.insertOne(character);

  if (result.acknowledged == false) {
    res.status(500).send({ error: "Personagem não existe." });
    return;
  }
  res.status(201).send(character);
});

module.exports = router;
