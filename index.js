const express = require("express");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

(async () => {
  const app = express();
  app.use(express.json());
  const port = 3000;
  const connectionString = `mongodb://localhost:27017/db_project_blue`;

  // fazendo a conexão direta com o banco
  const options = {
    useUnifiedTopology: true,
  };
  // cria um cliente
  const cliente = await mongodb.MongoClient.connect(connectionString, options);
  // pegando o banco do cliente
  const db = cliente.db("db_project_blue");
  // buscando o objeto do banco
  const characters = db.collection("characters");

  app.get("/", (req, res) => {
    res.send({ info: "Olá" });
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
  });
})();
