// Configuração inicial para carregar as variáveis do arquivo .env
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware essencial: permite que o Express entenda requisições com corpo em JSON
app.use(express.json());

// Definindo que todas as rotas criadas em orderRoutes serão usadas na raiz ('/')
app.use('/', orderRoutes);

// Conexão com o banco de dados MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Conectado ao MongoDB com sucesso!');
        
        // Inicia o servidor apenas se a conexão com o banco for bem-sucedida
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Erro ao conectar no MongoDB:', error.message);
    });