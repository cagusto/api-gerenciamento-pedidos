const mongoose = require('mongoose');

/**
 * Schema (Estrutura) dos itens que compõem um pedido.
 * Define os tipos de dados e a obrigatoriedade de cada campo.
 */
const ItemSchema = new mongoose.Schema({
    productId: { type: Number, required: true }, // ID do produto
    quantity: { type: Number, required: true },  // Quantidade comprada
    price: { type: Number, required: true }      // Preço unitário do produto
});

/**
 * Schema principal do Pedido no banco de dados.
 * Mapeia exatamente como o documento será salvo no MongoDB.
 */
const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true }, // Identificador único (não permite duplicidade)
    value: { type: Number, required: true },                 // Valor total do pedido
    creationDate: { type: Date, required: true },            // Data e hora da criação
    items: [ItemSchema]                                      // Array contendo os itens (utiliza o ItemSchema)
});

// Exporta o modelo para que possa ser importado e manipulado pelos controladores
module.exports = mongoose.model('Order', OrderSchema);