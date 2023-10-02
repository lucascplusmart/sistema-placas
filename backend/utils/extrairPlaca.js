function extrairPlaca(texto) {
  const regexAntigo = /[A-Z]{3}[^A-Z0-9\n]*[0-9]{4}/;
  const regexAtual = /[A-Z]{3}[0-9]{1}[A-Z0-9]{1}[0-9]{2}/;


  const matchAntigo = texto.match(regexAntigo);
  const matchAtual = texto.match(regexAtual);

  if (matchAntigo) {
    return matchAntigo[0].replace(/\s/g, '').replace(/[^A-Z0-9]/g, '-');
  } else if (matchAtual) {
    return matchAtual[0].replace(/\s/g, '');
  }  
  return null;
}

module.exports = extrairPlaca;