const express = require("express");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

(async () => {
  const app = express();
  app.use(express.json());
  const port = 3000;

  app.get("/", (req, res) => {
    res.send({ info: "Olá" });
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
})();
