
const COLORS = {
  info: '\x1b[32m',   
  error: '\x1b[31m',  
  warn: '\x1b[33m',   
  debug: '\x1b[36m',  
  reset: '\x1b[0m'    
};

const logger = {
  /**
   * @param {string} message - Mensagem a ser logada.
   */
  info(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${COLORS.info}[INFO]${COLORS.reset} ${message}`);
  },

  /**
   * @param {string} message - Mensagem de erro.
   */
  error(message) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ${COLORS.error}[ERROR]${COLORS.reset} ${message}`);
  },

  /**
   * Loga uma mensagem de aviso.
   * @param {string} message - Mensagem de aviso.
   */
  warn(message) {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] ${COLORS.warn}[WARN]${COLORS.reset} ${message}`);
  },

  /**
   * @param {string} message - Mensagem de debug.
   */
  debug(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${COLORS.debug}[DEBUG]${COLORS.reset} ${message}`);
  }
};

module.exports = logger;