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


```cd boleto```

```npm install```


### Tests

```cd boleto```

```npm test```

### Server

```cd boleto```

```node src/app.js```



