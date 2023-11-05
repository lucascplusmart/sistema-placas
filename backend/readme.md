## ROTAS PARA placas

- api/placas/cadastroPlaca (post)
- api/placas/relatorio/cidade/:cidade (get)
- api/placas/consulta/:placa (get)


## Teste usando o curl

exemplos:

- curl http://localhost:3000/api/placas/relatorio/cidade/:cidade
- curl http://localhost:3000/api/placas/consulta/:placa

# Documentação da API de Placas

## Cadastro de Placa

### Endpoint

`POST /cadastroPlaca`

### Descrição

Este endpoint permite o cadastro de uma placa de veículo a partir de uma imagem no formato PNG. A API realiza o reconhecimento de caracteres na imagem para extrair o número da placa e armazena no banco de dados juntamente com a cidade, data e hora da operação.

### Requisição

- Método: POST
- Formato de dados aceitável: Multipart/form-data

#### Parâmetros da Requisição

- `image` (arquivo): A imagem da placa no formato PNG.
- `cidade` (string): Nome da cidade associada à placa.

### Respostas

- 200 OK: A placa foi cadastrada com sucesso. A resposta contém os dados da placa, incluindo o número da placa, cidade, data e hora do cadastro.
- 400 Bad Request: Erro de validação, como formato de imagem inválido.
- 500 Internal Server Error: Ocorreu um erro interno no servidor.

## Geração de Relatório por Cidade

### Endpoint

`GET /relatorio/cidade/:cidade`

### Descrição

Este endpoint permite gerar um relatório em PDF contendo informações sobre as placas cadastradas em uma cidade específica. O relatório inclui o número da placa, cidade, data e hora de cada registro na cidade.

### Requisição

- Método: GET
- Parâmetros de URL:
  - `cidade` (string): Nome da cidade para a qual deseja gerar o relatório.

### Respostas

- 200 OK: O relatório em PDF foi gerado com sucesso e está pronto para download.
- 404 Not Found: Nenhum registro encontrado para a cidade especificada.
- 500 Internal Server Error: Ocorreu um erro interno ao gerar o relatório.

## Consulta de Placa

### Endpoint

`GET /consulta/:placa`

### Descrição

Este endpoint permite consultar se uma placa específica está cadastrada no banco de dados. Se a placa estiver cadastrada, a API retornará os detalhes da placa, incluindo número da placa, cidade, data e hora do cadastro.

### Requisição

- Método: GET
- Parâmetros de URL:
  - `placa` (string): Número da placa a ser consultada.

### Respostas

- 200 OK: A placa está cadastrada, e os detalhes são retornados.
- 404 Not Found: A placa não está cadastrada no banco de dados.
- 500 Internal Server Error: Ocorreu um erro interno ao consultar a placa.
