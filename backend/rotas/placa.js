const express = require('express');
const multer = require('multer');
const axios = require('axios');
const formData = require('form-data');
const { MongoClient, ServerApiVersion } = require('mongodb');
const extrairPlaca = require('../utils/extrairPlaca.js');
const PDFDocument = require('pdfkit');
require('dotenv').config();

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const ocrApiUrl = 'https://api.ocr.space/parse/image';
const apiKey = process.env.API_KEY;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

router.post('/cadastroPlaca', upload.single('image'), async (req, res) => {
  try {
    if (!req.file || req.file.mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Apenas arquivos no formato png.' });
    }

    const currentDate = new Date();
    const dataHora = new Date(currentDate.getTime() - (3 * 60 * 60 * 1000));
    const dataAtual = dataHora.toISOString().split('T')[0]; 
    const horaAtual = dataHora.toISOString().split('T')[1].split('.')[0]; 
    let dados; 
    // Consumindo a API
    const form = new formData();
    form.append('file', req.file.buffer, {
      filename: 'image.png',
      contentType: 'image/png'
    });
    form.append('detectOrientation', 'true');
    form.append('scale', 'true');
    form.append('OCREngine', '1');
    form.append('filetype', 'png');

    let options = {
      headers: {
          'apikey': apiKey,
          ...form.getHeaders()
        }};

    const response = await axios.post(ocrApiUrl, form, options);
    if (!response || !response.data || !response.data.ParsedResults || !response.data.ParsedResults[0]) {
      return res.status(400).json({ error: 'Imagem invalida' });
    }
    // Tratando a resposta
    const numero_placa = extrairPlaca(response.data.ParsedResults[0].ParsedText);
    if (!numero_placa) {
      return res.status(400).json({ error: 'Não foi possível detectar o número da placa.' });
    }
    // Inserindo no banco de dados
    try {
      await client.connect();
      const collection = client.db("database").collection("placas");
      dados = {
        placa: numero_placa,
        cidade: req.body.cidade, 
        data: dataAtual,
        hora: horaAtual
      };
      await collection.insertOne(dados);
    } finally {
      await client.close();
    }

    res.status(200).json(dados)
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro!' });
  }
});

router.get('/relatorio/cidade/:cidade', async (req, res) => {
  const cidade = req.params.cidade;
  try {
    let registros;
    try{
      await client.connect();
      const collection = client.db("database").collection("placas");
      
      registros = await collection.find({ cidade }).toArray();

      if (registros.length === 0) {
        return res.status(404).json({ error: 'Nenhum registro encontrado para a cidade especificada.' });
      }
    } finally {
      await client.close();
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=relatorio_${cidade}.pdf`);
    doc.pipe(res);

    doc.fontSize(18).text(`Relatório de Placas - Cidade: ${cidade}`, { align: 'center' });
    doc.moveDown();

    registros.forEach((registro) => {
      doc.text(`Número da Placa: ${registro.placa}`);
      doc.text(`Cidade: ${registro.cidade}`);
      doc.text(`Data: ${registro.data}`);
      doc.text(`Hora: ${registro.hora}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao gerar o relatório.' });
}});

router.get('/consulta/:placa', async(req, res) => {
  try{
    let placa = req.params.placa;
    try {
      await client.connect();
      const collection = client.db("database").collection("placas");
      placa = await collection.findOne({ placa });
    } finally {
      await client.close();
    }
    if (placa) {
      res.json({ placa: placa });
    } else {
      res.status(404).json({ error: "Nenhum registro encontrado." });
    }
  }catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro ao consultar a placa.' });
    }
});

router.get('/teste', async(req, res) => {
    return res.json("ola munfo")
});


module.exports = router;