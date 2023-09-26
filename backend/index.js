const express = require('express');
const placaRota = require('./rotas/placa'); // Importa as rotas da placas

const app = express();

app.use(express.json()); // Permite o uso de JSON no corpo das requisições

// Todas as rotas de alunos começam com 'api'
app.use('/api', placaRota);


const PORT = 3000; // Você pode escolher uma porta diferente se necessário

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
