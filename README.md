# TO-DO List

## Pré-requesitos
A aplicação é 100% dockerizada, portanto o único pré-requesito para instalar e rodar é ter a engine do Docker no seu computador

## Rodando o projeto

Antes de tentar buildar a aplicação, é importante lembrar que o Docker deve estar rodando.

### Usando Make

Para buildar e executar, basta usar o seguinte comando no diretório root da aplicação (to-do-list):
 ```
 ./make build
 ```

ou no Linux:

 ```
 make build
 ```
 ---
Depois da primeira build, o seguinte comando pode ser usado:
 ```
 ./make up
 ```

ou no Linux:

 ```
 make up
 ```


### Usando diretamente o Docker
Para buildar e executar sem o make, basta usar o seguinte comando no diretório root da aplicação (to-do-list):
 ```
 docker compose up --build
 ```
Depois da primeira build, o seguinte comando pode ser usado:
 ```
 docker compose up
 ```

<sub>Observação: para versões mais antigas, é possível que o comando seja `docker-compose`</sub>

## Acessando a aplicação
A página web pode ser acessada à partir da porta 5050 do localhost. Portanto, em um navegador web, acesse http://localhost:5050 com o projeto executando. 

Para alterar a porta do front-end, devem ser alteradas as portas nos seguintes arquivos:
- compose.yml
- frontend/Dockerfile
- backend/src/main/java/Task/TaskController.java (@CrossOrigin("http://localhost:5050") deve ser alterado)

# API

## Corpo da requisição e a tarefa
Uma tarefa é composta por:
- um id único, usado como chave primária no banco de dados;
- uma data de entrega, que deve ser presente ou futura na criação;
- um status, que pode ser: "NOT_STARTED", "IN_PROGRESS", "ON_HOLD", "COMPLETED";
- um nome, que não pode ser deixado em branco;
- uma descrição.

Abaixo está um exemplo de corpo de uma requisição que pode ser enviada para adição de tarefa:
```
{
    "id" : "1",
    "dueDate" : "2024-11-09",
    "status" : "NOT_STARTED",
    "name" : "Veter",
    "description" : "macarrão"
}
```

## Endpoints

### HTTP GET

- http://localhost:7070/api/tasks/all-tasks : retorna todas as tarefas
- http://localhost:7070/api/tasks/{id} : retorna uma tarefa pelo id

### HTTP POST

- http://localhost:7070/api/tasks/add-task : adiciona uma tarefa ao banco de dados e retorna a mesma. Necessita de uma tarefa no corpo da requisição

### HTTP PUT

- http://localhost:7070/api/tasks/{id} : atualiza uma tarefa pelo id e retorna a tarefa substituída. Necessita de uma tarefa no corpo da requisição

### HTTP DELETE

- http://localhost:7070/api/tasks/{id} : remove uma tarefa do banco de dados por id
- http://localhost:7070/api/tasks/delete-all : remove todas as tarefas do banco de dados