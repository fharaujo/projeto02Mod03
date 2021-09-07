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

// DELETE /characters/{:id} deletando personagem pelo id
router.delete("/:id", async (req, res) => {
  await db_connect();
  const id = req.params.id;

  //Busca e retorna a quantidade de personagens pelo ID que foi passado
  const quantityCharacters = await characters.countDocuments({
    _id: ObjectId(id),
  });

  // verificando se existe o  personagem
  if (quantityCharacters !== 1) {
    res.status(404).send({ erro: "Personagem não encontrado." });
    return;
  }

  // deletando o personagem com id existente
  const deleteCharacter = await characters.deleteOne({ _id: ObjectId(id) });

  // se não conseguir deletar o personagem
  if (deleteCharacter.deletedCount !== 1) {
    res.status(500).send({ error: "Ocorreu um erro ao deletar o personagem." });
  }
  res.status(204);
});

module.exports = router;
