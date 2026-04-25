const pool = require('../config/database');

async function findAll() {
  const [rows] = await pool.execute('SELECT * FROM products');
  return rows;
}

async function findById(id) {
  const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(data) {
  const { name, price, description } = data;
  const [result] = await pool.execute(
    'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
    [name, price, description]
  );
  return result.insertId;
}

async function update(id, data) {
  const { name, price, description } = data;
  const [result] = await pool.execute(
    'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
    [name, price, description, id]
  );
  return result.affectedRows === 1;
}

async function deleteById(id) {
  const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);
  return result.affectedRows === 1;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteById
};