const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const { MongoClient, ServerApiVersion } = require('mongodb');
const checarUsuario = require('../utils/checarUsuario.js');
require('dotenv').config();
const bodyParser = require('body-parser');

const router = express.Router();

const secretKey = process.env.SECRET_KEY;

router.use(bodyParser.urlencoded({extended: true}))

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

router.post('/cadastro', async (req, res) => {
  const { nome, senha } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const senhaParaSalvar = bcrypt.hashSync(senha, salt);
    console.log(senhaParaSalvar)
    // Tente verificar se o usuário já existe
    
    const usuario = await checarUsuario(nome);
    if (usuario != null) {
      res.status(500).json({ error: 'Usuário já cadastrado' });
      return;
    }

    // Insere no BD
    try {
      await client.connect();
      const collection = client.db("database").collection("usuarios");
      await collection.insertOne({login: nome, senha: senhaParaSalvar});
    } finally {
      await client.close();
    }
    res.status(200).json({ Sucesso: 'Usuário cadastrado' });
  } catch (error) {
    console.error("Erro geral:", error);
    res.status(500).json({ erro: 'Erro geral' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const {nome, senha} = req.body
    const usuario = await checarUsuario(nome);
    if (usuario == null) {
      res.status(500).json({ error: 'Usuário ou senha errados' });
      return;
    }
    const r = bcrypt.compareSync(senha, usuario.senha)
    if (r){
      let token = jwt.sign({usuario}, secretKey, {expiresIn: 9000})
      res.status(200).json({ Sucesso: 'Logado com sucesso!' , Token: token });
    }else{
      res.status(500).json({ error: 'Usuário ou senha errados' });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro!' });
  }
});

router.get('/teste', async (req, res) => {
  try {
    res.status(200).json({ Sucesso: 'Usuário cadastrado' });
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro!' });
  }
});

module.exports = router;