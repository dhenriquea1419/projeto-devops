const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/auth');

// Validação JWT_SECRET
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET não está definido no arquivo .env');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de CORS para Expo/React Native
app.use(cors({
  origin: [
    'http://localhost:19006',
    'http://localhost:8081',
    'http://localhost:19000'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Função para iniciar o servidor (mantida)
async function iniciarServidor() {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log('✅ Pronto para receber requisições!');
  }).on('error', (err) => {
    console.error('❌ Erro ao iniciar o servidor:', err);
    process.exit(1);
  });
}

// Tratamento de SIGTERM (mantido)
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM recebido. Encerrando servidor graciosamente...');
  process.exit(0);
});

// Inicia o servidor
iniciarServidor();
