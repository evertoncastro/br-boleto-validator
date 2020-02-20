# Validador de Boleto

## O projeto

### Sobre


O objetivo inicial é expor uma api REST que recebe uma linha digitável de um boleto do tipo bancário de 47 posições, ou de um boleto de arrecadação de 48 posições (apenas para referências 6, 7, 8 e 9).



### Estrutura


API construída com Nodejs utilizando o framework Express para gestão de rotas.



### Testes unitários
Os testes unitários foram criados utilizando Mocha.js e Chai.js


## Dependências

- Node 10.16 ou posterior
- Express 4.17.1
- Mocha 5.2.0
- Chai 4.1.2
- Chai Spies 1.0.0

## Funcionamento

### Setup


```
cd boleto

npm install
```


### Tests

```
cd boleto

npm test
```

### Server

```
cd boleto

node src/app.js
```


## Endpoint

### GET /get_billet_info

```
curl http://localhost:8080/get_billet_info/03399134287540100000710838001013480180000073000 
```

Resposta 200 
```
{
	"barCode": "03394801800000730009134275401000001083800101",
	"billetValue": "730.00",
	"billetDueDate": "2019-09-20",
	"validLine": true
}
```

Resposta 400
```
{
    "name": "BusinessException",
    "message": "INVALID DV FOR BLOCK 1"
}

```

As mensagens inválidas variam conforme o erro

- INVALID DV FOR BLOCK [X] (Indica que um dos blocos está com dígito inválido).

- INVALID LINE SIZE (Indica que foi informada uma linha digitável de tamanho diferente de 47 ou 48 caracteres).


- INVALID BAR CODE DV (Indica que o dígito verificador do código de barras está inválido).

