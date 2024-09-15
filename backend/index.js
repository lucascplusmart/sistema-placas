const express = require('express');
const http = require('http');
const createSocket = require('./sockets/sockets');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const placaRota = require('./rotas/placa'); // Importa as rotas da placas
const usuarioRota = require('./rotas/usuario');
const alertaRota = require('./rotas/alerta');

// Permite o uso de JSON no corpo das requisições
app.get('/api', (req, res) => {
  res.send('Hello');
});

// Todas as rotas de alunos começam com 'api/placas/'
app.use('/api/placas', placaRota);
app.use('/api/usuario', usuarioRota);
app.use('/api/alerta', alertaRota);

const PORT = 8080; // Você pode escolher uma porta diferente se necessário

const server = http.createServer(app);
const io = createSocket(server);
app.set('socketio', io);

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
