# 📦 API de Gerenciamento de Pedidos

Uma API RESTful desenvolvida em Node.js e Express para gerenciar pedidos, utilizando o MongoDB como banco de dados. Este projeto demonstra as operações CRUD completas, com transformação e padronização de dados.

## 🚀 Tecnologias Utilizadas

* **Node.js**
* **Express.js** (Roteamento e Servidor)
* **Mongoose** (Modelagem do MongoDB)
* **MongoDB** (Banco de Dados NoSQL)
* **Dotenv** (Gerenciamento de variáveis de ambiente)

## 🛠️ Como Instalar e Rodar Localmente

1.  Clone este repositório:
    ```bash
    git clone https://github.com/cagusto/api-gerenciamento-pedidos.git
    ```
2.  Acesse a pasta do projeto:
    ```bash
    cd api-gerenciamento-pedidos
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Configure as variáveis de ambiente:
    * Crie um arquivo chamado `.env` na raiz do projeto.
    * Adicione as seguintes linhas (ajustando a URL do MongoDB conforme seu ambiente):
        ```env
        PORT=3000
        MONGODB_URI=mongodb://localhost:27017/api_gerenciamento_pedidos
        ```
5.  Inicie o servidor:
    ```bash
    node index.js
    ```

## 📖 Endpoints da API

Abaixo estão as rotas disponíveis nesta API.

### 1. Criar um Pedido (POST)
* **URL:** `/order`
* **Corpo da Requisição (JSON):**
    ```json
    {
      "numeroPedido": "v10089015vdb-01",
      "valorTotal": 10000,
      "dataCriacao": "2023-07-19T12:24:11.529Z",
      "items": [
        {
          "idItem": "2434",
          "quantidadeItem": 1,
          "valorItem": 1000
        }
      ]
    }
    ```

### 2. Buscar um Pedido pelo ID (GET)
* **URL:** `/order/:id`
* **Exemplo:** `http://localhost:3000/order/v10089015vdb-01`

### 3. Listar Todos os Pedidos (GET)
* **URL:** `/order/list`

### 4. Atualizar um Pedido (PUT)
* **URL:** `/order/:id`
* **Corpo da Requisição:** Aceita o mesmo formato JSON utilizado na criação (POST).

### 5. Deletar um Pedido (DELETE)
* **URL:** `/order/:id`

## 💡 Observações sobre o Código
* **Mapeamento de Dados:** A API realiza a conversão automática dos campos do JSON recebido em português (ex: `numeroPedido`) para os atributos correspondentes em inglês no banco de dados (ex: `orderId`).
* **Tratamento de Erros:** O código possui blocos `try/catch` para garantir respostas HTTP apropriadas (como 404 para não encontrado e 500 para erro interno).