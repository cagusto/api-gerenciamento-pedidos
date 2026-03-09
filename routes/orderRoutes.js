const express = require('express');
const router = express.Router();

// Importa o controlador que contém a lógica de negócio
const orderController = require('../controllers/orderController');

// Mapeamento das rotas HTTP para as funções do controlador (CRUD)
router.post('/order', orderController.createOrder);          // Rota para Criar
router.get('/order/list', orderController.listOrders);       // Rota para Listar todos
router.get('/order/:id', orderController.getOrder);          // Rota para Buscar por ID
router.put('/order/:id', orderController.updateOrder);       // Rota para Atualizar
router.delete('/order/:id', orderController.deleteOrder);    // Rota para Deletar

module.exports = router;