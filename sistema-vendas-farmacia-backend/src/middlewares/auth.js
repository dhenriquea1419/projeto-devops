const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Acesso negado. Nenhum token fornecido.' });
  }

  
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token mal formatado.' });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (erro) {
    if (erro.name === 'TokenExpiredError') {
      return res.status(401).json({ mensagem: 'Token expirado.' });
    } else if (erro.name === 'JsonWebTokenError') {
      return res.status(401).json({ mensagem: 'Token inválido.' });
    } else {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  }
};

module.exports = authMiddleware;