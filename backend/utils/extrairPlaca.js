function extrairPlaca(texto) {
    const regexAntigo = /[A-Z]{3}[^A-Z0-9]*[0-9]{4}/;
    const regexAtual = /[A-Z]{3}[0-9]{1}[A-Z0-9]{1}[0-9]{2}/;
  
    const matchAntigo = texto.match(regexAntigo);
    const matchAtual = texto.match(regexAtual);
  
    if (matchAntigo) {
      return matchAntigo[0];
    } else if (matchAtual) {
      return matchAtual[0];
    }return null; 
  }

module.exports = extrairPlaca;