const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

require("dotenv").config();

// variáveis de ambientes do banco
const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSOWRD;
const dbUser = process.env.DB_USER;
const dbChar = process.env.DB_CHAR;
// string de conexão
const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.${dbChar}.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const options = {
  useUnifiedTopology: true,
};
// cria um cliente
const client = new mongodb.MongoClient(connectionString, options);
// pegando cliente db
const db = client.db("db_project_blue");
// buscando o objeto especifico do banco
const characters = db.collection("characters");

// testando a conexão
async function db_connect() {
  try {
    await client.connect();
    console.log("MongoDB conectado com sucesso.");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { db_connect, db, characters, ObjectId };
