const express = require('express');
const placaRota = require('./rotas/placa'); // Importa as rotas da placas
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json()); // Permite o uso de JSON no corpo das requisições

// Todas as rotas de alunos começam com 'api/placas/'
app.use('/api/placas', placaRota);


const PORT = 8080; // Você pode escolher uma porta diferente se necessário

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
