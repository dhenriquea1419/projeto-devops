
/**
 * @param {string} email - O email a ser validado.
 * @returns {boolean} - true se válido.
 */
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
}

/**
 * @param {string} cpf - O CPF a ser validado (com ou sem formatação).
 * @returns {boolean} - true se válido.
 */
function isValidCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  if (remainder >= 10) remainder = 0;
  if (parseInt(cpf.charAt(9)) !== remainder) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  if (remainder >= 10) remainder = 0;

  return parseInt(cpf.charAt(10)) === remainder;
}

/**
 * @param {string} telefone - O telefone a ser validado (com ou sem formatação).
 * @returns {boolean} - true se válido.
 */
function isValidTelefone(telefone) {
  const telLimpo = telefone.replace(/\D/g, '');
  return (telLimpo.length === 10 || telLimpo.length === 11) && telLimpo.length > 0;
}

/**
 * @param {string} data - A data no formato DD/MM/YYYY.
 * @returns {boolean} - true se válida.
 */
function isValidDateDDMMYYYY(data) {
  const partes = data.split('/');
  if (partes.length !== 3) return false;

  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10);
  const ano = parseInt(partes[2], 10);

  if (isNaN(dia) || isNaN(mes) || isNaN(ano)) return false;

  const date = new Date(ano, mes - 1, dia);
  return date.getDate() === dia &&
         date.getMonth() === mes - 1 &&
         date.getFullYear() === ano;
}

/**
 * @param {string|number} valor - O valor a ser validado.
 * @returns {boolean} - true se número positivo.
 */
function isPositiveNumber(valor) {
  const num = parseFloat(valor);
  return !isNaN(num) && num > 0;
}

/**
 * @param {string} str - A string a ser validada.
 * @returns {boolean} - true se não vazia.
 */
function isNonEmptyString(str) {
  return str && typeof str === 'string' && str.trim().length > 0;
}

module.exports = {
  isValidEmail,
  isValidCPF,
  isValidTelefone,
  isValidDateDDMMYYYY,
  isPositiveNumber,
  isNonEmptyString
};