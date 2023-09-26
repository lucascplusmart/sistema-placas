## ROTAS PARA placas

- /relatorio/cidade/:cidade (get)
- /consulta/:placa (get)


## Teste usando o curl

exemplos:

- curl http://localhost:3000/api/relatorio/cidade/:cidade
- curl http://localhost:3000/api/consulta/:placa
- curl -X POST -H "Content-Type: application/json" -d '{"nome":"Maria","media":950}' http://localhost:3000/api/redacaoEnem

## banco de dados
admin
TOC1LrMumzbiICgR

urls: mongodb+srv://admin:TOC1LrMumzbiICgR@cluster-estudo.v8kd5m0.mongodb.net/?retryWrites=true&w=majority
