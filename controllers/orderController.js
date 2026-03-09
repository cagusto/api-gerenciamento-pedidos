const Order = require('../models/order'); // Importando nosso modelo de banco de dados

/**
 * Função auxiliar para realizar a transformação (Mapping) dos dados.
 * Transforma o formato recebido no corpo da requisição (JSON em português)
 * para o formato padrão esperado pelo banco de dados (em inglês).
 */
const mapOrderData = (data) => {
    return {
        orderId: data.numeroPedido,
        value: data.valorTotal,
        creationDate: data.dataCriacao,
        items: data.items.map(item => ({
            productId: Number(item.idItem),
            quantity: Number(item.quantidadeItem),
            price: Number(item.valorItem)
        }))
    };
};

/**
 * Cria um novo pedido no banco de dados (Create)
 */
exports.createOrder = async (req, res) => {
    try {
        const mappedData = mapOrderData(req.body); // Transforma os dados
        const newOrder = new Order(mappedData);    // Prepara o documento
        await newOrder.save();                     // Salva no MongoDB
        
        // Retorna status 201 (Created) em caso de sucesso
        res.status(201).json({ message: 'Pedido criado com sucesso', order: newOrder });
    } catch (error) {
        // Retorna status 400 (Bad Request) se houver erro de validação ou duplicidade
        res.status(400).json({ error: 'Erro ao criar pedido. Verifique os dados enviados.', details: error.message });
    }
};

/**
 * Busca um pedido específico pelo seu ID (Read)
 */
exports.getOrder = async (req, res) => {
    try {
        const orderId = req.params.id; // Extrai o ID da URL
        const order = await Order.findOne({ orderId: orderId }); // Busca no banco
        
        if (!order) {
            // Retorna 404 (Not Found) se o pedido não existir
            return res.status(404).json({ message: 'Pedido não encontrado.' });
        }
        res.status(200).json(order); // Retorna 200 (OK) com os dados
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao buscar o pedido.', details: error.message });
    }
};

/**
 * Lista todos os pedidos cadastrados no banco (Read All)
 */
exports.listOrders = async (req, res) => {
    try {
        const orders = await Order.find(); // Busca todos os documentos
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar pedidos.', details: error.message });
    }
};

/**
 * Atualiza os dados de um pedido existente (Update)
 */
exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const mappedData = mapOrderData(req.body); // Transforma os novos dados
        
        // Atualiza e já retorna o documento modificado (new: true)
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: orderId },
            mappedData,
            { new: true, runValidators: true } 
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Pedido não encontrado para atualização.' });
        }
        res.status(200).json({ message: 'Pedido atualizado com sucesso', order: updatedOrder });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar pedido.', details: error.message });
    }
};

/**
 * Remove um pedido do banco de dados (Delete)
 */
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await Order.findOneAndDelete({ orderId: orderId });

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Pedido não encontrado para exclusão.' });
        }
        res.status(200).json({ message: 'Pedido deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar pedido.', details: error.message });
    }
};