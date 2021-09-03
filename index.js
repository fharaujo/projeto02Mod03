const express = require("express");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
require("dotenv").config();

(async () => {
  const app = express();
  app.use(express.json());
  // variáveis de ambientes do banco
  const dbName = process.env.DB_NAME;
  const dbPassword = process.env.DB_PASSOWRD;
  const dbUser = process.env.DB_USER;
  const dbChar = process.env.DB_CHAR;

  // porta do servidor
  const port = 3000;
  // string de conexão com MongoDB Atlas (Cloud)
  const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.${dbChar}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  // fazendo a conexão direta com o banco
  const options = {
    useUnifiedTopology: true,
  };
  // cria um cliente
  const cliente = await mongodb.MongoClient.connect(connectionString, options);
  // pegando cliente db
  const db = cliente.db("db_project_blue");
  // buscando o objeto especifico do banco
  const characters = db.collection("characters");

  // pegando personagem é válido e colocando em uma array de objeto/json
  const getCharacterValid = () => characters.find({}).toArray();

  // buscando personagem pelo id
  const getCharactersById = (id) => characters.findOne({ _id: ObjectId(id) });

  // criando/inserindo personagem
  const postCharacters = (character) => characters.insertOne({ character });

  // update personagem
  const putCharacters = (id, character) =>
    characters.updateOne({ _id: ObjectId(id) }, { $set: character });

  // excluindo personagem
  const deleteCharacters = (id) => characters.deleteOne({ _id: ObjectId(id) });

  //CORS
  app.all("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Methods", "*");

    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
    );

    next();
  });

  // GET "/" rota inicial
  app.get("/", (req, res) => {
    res.send({ info: "Projeto 02 - Módulo 03" });
  });

  // GET /characters respondendo a req todos os personagens válidas
  app.get("/characters", async (req, res) => {
    res.send(await getCharacterValid());
  });

  // GET /Characters{:id} respondendo a req com o personagem pelo id
  app.get("/characters/:id", async (req, res) => {
    const id = req.params.id;
    const character = await getCharactersById(id);
    if (!character) {
      res.status(404).send({ erro: "Personagem não existe." });
    }
    res.send({ character });
  });

  // POST /characters respondendo todos os personagens
  app.post("/characters", async (req, res) => {
    const character = req.body;

    if (!character || !character.nome || !character.imagemUrl) {
      res.status(404).send({ error: "Personagem inválido." });
      return;
    }

    const result = await postCharacters(character);
    if (result == false) {
    }
  });

  // PUT /characters/{:id} atualizando personagem pelo id
  app.put("/characters/:id", async (req, res) => {
    const id = req.params.id;
    const character = req.body;

    if (!character || !character.nome || !character.imagemUrl) {
      res.status(404).send({ error: "Personagem está falando elementos." });
      return;
    }

    const quantityCharacters = await characters.countDocuments({
      _id: ObjectId(id),
    });
    if (quantityCharacters !== 1) {
      res.status(404).send({ erro: "Personagem não encontrado." });
      return;
    }
    const updateCharacter = await putCharacters(id, character);
    console.log(updateCharacter);
    if (updateCharacter.modifiedCount !== 1) {
      res.send({ error: "Erro na atualização." });
      return;
    }

    res.send(await getCharactersById(id));
  });

  // DELETE /characters/{:id} deletando personagem pelo id
  app.delete("/characters/:id", async (req, res) => {
    const id = req.params.id;

    const quantityCharacters = await characters.countDocuments({
      _id: ObjectId(id),
    });
    if (quantityCharacters !== 1) {
      res.status(404).send({ erro: "Personagem não encontrado." });
      return;
    }

    const deleteCharacter = await deleteCharacters(id);

    console.log(deleteCharacter);
    res.send(deleteCharacters(id));
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
  });
})();
