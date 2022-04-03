# Ewally - Processo avaliativo - API de boleto

### Introdução

Esta API se destina a retorno de dados de um boleto a partir de uma linha digitável; 
ela verifica se a linha digitável é válida e, caso não seja, retorna a falha encontrada;
caso a linha digitável seja válida, retornará as seguintes informações: `data de validade`, `total` e `código de barra`.

### Uso

Inicie a aplicação, em seguida acesse o localhost de sua máquina.


```bash
yarn start
# or
npm start
```

A estrutura da rota é essa: http://localhost:8080/boleto/{digitable_line}

EXEMPLOS:

http://localhost:8080/boleto/23793381286008040974591000063304488970000051500

http://localhost:8080/boleto/836200000005667800481000180975657313001589636081

http://localhost:8080/boleto/858900004609524601791605607593050865831483000010

http://localhost:8080/boleto/836200000005667800481000180975657313001589636081

### Testes

Para rodar os testes, execute:
```bash
yarn test
# or
npm test
```


# ewally-avaliation
