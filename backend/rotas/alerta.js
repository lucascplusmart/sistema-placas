const express = require('express');
const verificarJWT = require('../middlewares/verificarJWT.js')
const bodyParser = require('body-parser');
//const io = global.io;

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}))

router.post('/',verificarJWT, (req, res) => {  
    var io = req.app.get('socketio');
    io.emit('alerta', 'Inconsistência de dados ou equipamentos foram detectados no sistema');
    res.json({ mensagem: 'Alerta enviado com sucesso' });
  });

module.exports = router;