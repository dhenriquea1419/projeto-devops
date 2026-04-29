const jwt = require('jsonwebtoken');

// Validação inicial: Verifica se a variável de ambiente JWT_SECRET está definida
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET não está definido');
  throw new Error('A variável de ambiente JWT_SECRET é obrigatória para o middleware de autenticação');
}

// Função auxiliar para extrair o token de diferentes formatos/locais
// Prioridade: Header Authorization (Bearer), Cookie 'token', Query param 'token'
function extrairToken(req) {
  // 1. Header Authorization
  let token = req.header('Authorization');
  if (token && token.startsWith('Bearer ')) {
    return token.substring(7).trim();
  }

  // 2. Cookie 'token' (requer cookie-parser middleware antes)
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }

  // 3. Query parameter 'token' (não recomendado em produção por segurança)
  if (req.query && req.query.token) {
    return req.query.token;
  }

  return null;
}

const authMiddleware = (req, res, next) => {
  try {
    // Extrai o token
    const token = extrairToken(req);

    // Verifica se token foi encontrado
    if (!token) {
      console.error('Nenhum token de autenticação fornecido na requisição');
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Acesso negado. Token de autenticação não fornecido.'
      });
    }

    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Atribui o usuário decodificado à requisição para uso posterior
    req.user = decoded;

    // Prossegue para o próximo middleware
    next();

  } catch (err) {
    // Log detalhado do erro para debug
    console.error('Erro na verificação JWT:', {
      name: err.name,
      message: err.message,
      tokenPrefix: req.header('Authorization') ? req.header('Authorization').substring(0, 20) + '...' : 'N/A'
    });

    // Tratamento específico de erros JWT
    let mensagem = 'Token inválido.';

    switch (err.name) {
      case 'TokenExpiredError':
        mensagem = 'Sessão expirada. Faça login novamente.';
        break;
      case 'JsonWebTokenError':
        mensagem = 'Token corrompido ou inválido.';
        break;
      case 'NotBeforeError':
        mensagem = 'Token ainda não é válido (Not Before).';
        break;
      case 'JsonWebTokenError': // Alias para outros erros de assinatura
        mensagem = 'Assinatura do token inválida.';
        break;
      default:
        mensagem = 'Erro na autenticação. Tente novamente.';
    }

    return res.status(401).json({
      sucesso: false,
      mensagem
    });
  }
};

module.exports = authMiddleware;