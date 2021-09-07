const express = require("express");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
var cors = require("cors");
require("dotenv").config();
require("express-async-errors");

// importação dos endpoints
const home = require("./components/home/home");
const readAll = require("./components/read-all/readAll");
const readById = require("./components/read-by-id/readById");
const create = require("./components/create/create");
const update = require("./components/update/update");
const exclude = require("./components/delete/delete");

(async () => {
  const app = express();
  app.use(express.json());
  // porta do servidor
  const port = process.env.PORT || 3000;

  // criando/inserindo personagem
  const postCharacters = (character) => characters.insertOne({ character });

  // update personagem
  const putCharacters = (id, character) =>
    characters.updateOne({ _id: ObjectId(id) }, { $set: character });

  // excluindo personagem
  const deleteCharacters = (id) => characters.deleteOne({ _id: ObjectId(id) });

  // nova liberação do CORS em todas as requisições
  app.use(cors());
  app.options("*", cors()); // ativar todos os pre-flights erros

  // Rotas utilizadas
  app.use("/home", home); // principal
  app.use("/characters/read-all", readAll); // exibe todos os personagens
  app.use("/characters/readbyid", readById); // exibe personagem por ID
  app.use("/characters/create", create); // criar o personagem
  app.use("/characters/update", update); // atualizar personagem
  app.use("/characters/delete", exclude);
  // tratamento de erro middleware para verificar endpoints
  app.all("*", function (req, res) {
    res.status(404).send({ error: "Endpoint was not found" });
  });

  // tratamento de erros gerais middleware na mão
  app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Internal Server error.",
      },
    });
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}/home`);
  });
})();
