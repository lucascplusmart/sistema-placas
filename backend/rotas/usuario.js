const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');
const checarUsuario = require('../utils/checarUsuario.js');
require('dotenv').config();
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const secretKey = process.env.SECRET_KEY;

// Configuração da conexão com o mongo
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Rota de cadastro de usuários
router.post('/cadastro', async (req, res) => {
  const { email, senha } = req.body;
  try {
    // Criptografa a senha
    const salt = bcrypt.genSaltSync(10);
    const senhaParaSalvar = bcrypt.hashSync(senha, salt);
    console.log(senhaParaSalvar);
    // Tente verificar se o usuário já existe

    const usuario = await checarUsuario(email);
    if (usuario != null) {
      res.status(500).json({ error: 'Usuário já cadastrado' });
      return;
    }

    // Insere no BD
    try {
      await client.connect();
      const collection = client.db('database').collection('usuarios');
      await collection.insertOne({ login: email, senha: senhaParaSalvar });
    } finally {
      await client.close();
    }
    res.status(200).json({ Sucesso: 'Usuário cadastrado' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro geral' });
  }
});

// Rota de login de usuário
router.post('/login', async (req, res) => {
  try {
    // Checa se existe o usuário cadastrado no banco de dados
    const { email, senha } = req.body;
    const usuario = await checarUsuario(email);

    // Se não, retorna um erro
    if (usuario == null) {
      res.status(500).json({ error: 'Usuário ou senha errados' });
      return;
    }

    // Compara se a senha criptografada é igual a informada
    const r = bcrypt.compareSync(senha, usuario.senha);
    if (r) {
      // Se sim fornece um token para o login
      let token = jwt.sign({ usuario }, secretKey, { expiresIn: 9000 });
      res.status(200).json({ Sucesso: 'Logado com sucesso!', Token: token });
      // Se não, retorna erro
    } else {
      res.status(500).json({ error: 'Usuário ou senha errados' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro!' });
  }
});

module.exports = router;
