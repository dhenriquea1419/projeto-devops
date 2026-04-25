const errorHandler = (err, req, res, next) => {
  
  console.error('Erro capturado pelo middleware:', err);

  
  let statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
   
    res.status(statusCode).json({
      message: err.message,
      stack: err.stack
    });
  } else {
   
    res.status(statusCode).json({
      message: statusCode === 500 ? 'Erro interno do servidor' : err.message
    });
  }
};

module.exports = errorHandler;
