const express = require("express");
const router = express.Router();

// middleware que especifica que esta rota home será utilizada
router.use((req, res, next) => {
  next();
});

// GET "/" rota inicial home
router.get("/", async (req, res) => {
  res.send({ info: "Projeto 02 - Módulo 03" });
});

module.exports = router;
