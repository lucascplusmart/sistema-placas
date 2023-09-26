const express = require('express');
const alunosData = require('../dados/placa'); // Importa os dados dos alunos
const router = express.Router();

router.post('/cadastroPlaca', (req, res) => {
  res.json({ "teste": "teste" });
});

router.get('/relatorio/cidade/:cidade', (req, res) => {

  res.json({ "teste": "teste" });
});

router.get('/consulta/:placa', (req, res) => {

  res.json({ "teste": "teste" });
});


module.exports = router;