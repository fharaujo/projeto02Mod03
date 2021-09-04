const express = require("express");
const router = express.Router();

// middleware para uso desta rota pelo indexjs

router.use((req, res, next) => {
  next();
});
