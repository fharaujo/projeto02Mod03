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

// PUT /characters/{:id} atualizando personagem pelo id
router.put("/:id", async (req, res) => {
  await db_connect();
  const id = req.params.id;
  const character = req.body;

  if (!character || !character.nome || !character.imagemUrl) {
    res.status(400).send({ error: "Personagem está falando elementos." });
    return;
  }

  const quantityCharacters = await characters.countDocuments({
    _id: ObjectId(id),
  });

  if (quantityCharacters !== 1) {
    res.status(404).send({ erro: "Personagem não encontrado." });
    return;
  }

  const updateCharacter = await characters.updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $set: character,
    }
  );

  // Se ocorrer algum erro no MOngoDb
  if (updateCharacter.acknowledged == "undefined") {
    res
      .status(500)
      .send({ error: "Ocorreu um erro ao atualizar o personagem." });
    return;
  }
  const newCharacter = await characters.findOne({ _id: ObjectId(id) });
  res.send(newCharacter);
});

module.exports = router;
