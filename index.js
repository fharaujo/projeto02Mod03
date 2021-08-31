const express = require("express");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
require("dotenv").config();

(async () => {
  const app = express();
  app.use(express.json());
  const dbHost = process.env.DB_HOST;
  const dbPort = process.env.DB_PORT;
  const dbName = process.env.DB_NAME;

  const port = 3000;
  const connectionString = `mongodb://${dbHost}:${dbPort}/${dbName}`;

  // fazendo a conexão direta com o banco
  const options = {
    useUnifiedTopology: true,
  };
  // cria um cliente
  const cliente = await mongodb.MongoClient.connect(connectionString, options);
  // pegando o banco do cliente
  const db = cliente.db("db_project_blue");
  // buscando o objeto especifico do banco
  const characters = db.collection("characters");

  // pegando personagem é válido e colocando em uma array de objeto/json
  const getCharacterValid = () => characters.find({}).toArray();

  // buscando personagem pelo id
  const getCharactersById = (id) => characters.findOne({ _id: ObjectId(id) });

  const postCharacters = (character) => characters.insertMany([{ character }]);

  // GET "/" rota inicial
  app.get("/", (req, res) => {
    res.send({ info: "Projeto 02 - Módulo 03" });
  });

  // GET /characters respondendo a req todos os personagens válidas
  app.get("/characters", async (req, res) => {
    res.send(await getCharacterValid());
  });

  // GET /Characters respondendo a req com o personagem pelo id
  app.get("/characters/:id", async (req, res) => {
    const id = req.params.id;
    res.send(await getCharactersById(id));
  });

  // POST
  app.post("/characters", async (req, res) => {
    const character = req.body;
    res.send(await postCharacters(character));
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
  });
})();
