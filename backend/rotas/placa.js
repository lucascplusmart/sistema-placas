const express = require('express');
const alunosData = require('../dados/placa'); // Importa os dados dos alunos
const multer = require('multer');
const axios = require('axios');
const formData = require('form-data');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const ocrApiUrl = 'https://api.ocr.space/parse/image';

const apiKey = 'SUA KEY';

function extrairPlaca(texto) {
  const regexAntigo = /[A-Z]{3}[^A-Z0-9]*[0-9]{4}/;
  const regexAtual = /[A-Z]{3}[0-9]{1}[A-Z0-9]{1}[0-9]{2}/;

  const matchAntigo = texto.match(regexAntigo);
  const matchAtual = texto.match(regexAtual);

  if (matchAntigo) {
    return matchAntigo[0];
  } else if (matchAtual) {
    return matchAtual[0];
  } else {
    return null; 
  }
}

router.post('/cadastroPlaca', upload.single('image'), async (req, res) => {
  try {
    if (!req.file || req.file.mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Apenas arquivos no formato png.' });
    }

    const form = new formData();

    form.append('file', req.file.buffer, {
      filename: 'image.png',
      contentType: 'image/png'
    });
    form.append('detectOrientation', 'true');
    form.append('scale', 'true');
    form.append('OCREngine', '2');
    form.append('filetype', 'png');

    let options = {
      headers: {
          'apikey': apiKey,
          ...form.getHeaders()
        }
  };

    const response = await axios.post(ocrApiUrl, form, options);

    if (!response || !response.data || !response.data.ParsedResults || !response.data.ParsedResults[0]) {
      return res.status(400).json({ error: 'Imagem invalida' });
    }
    
    const numero_placa = extrairPlaca(response.data.ParsedResults[0].ParsedText);
    
    if (!numero_placa) {
      return res.status(400).json({ error: 'Não foi possível detectar o número da placa.' });
    }

    // to do: Mongo Connection

    console.log(numero_placa)
    res.json(numero_placa)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro!' });
  }
});

router.get('/relatorio/cidade/:cidade', (req, res) => {

  res.json({ "teste": "teste" });
});

router.get('/consulta/:placa', (req, res) => {

  res.json({ "teste": "teste" });
});


module.exports = router;