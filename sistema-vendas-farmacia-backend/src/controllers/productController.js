const Joi = require('joi');

let products = [
  { id: 1, name: 'Produto 1', price: 10.0, description: 'Descrição do produto 1' },
  { id: 2, name: 'Produto 2', price: 20.0, description: 'Descrição do produto 2' }
];
let nextId = 3;

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().allow('').max(500)
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  price: Joi.number().min(0),
  description: Joi.string().allow('').max(500)
}).min(1); 

const getAllProducts = (req, res) => {
  try {
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const getProductById = (req, res) => {
  const { id } = req.params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.status(200).json({ product });
};

const createProduct = (req, res) => {
  const { error, value } = createProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const newProduct = { id: nextId++, ...value };
    products.push(newProduct);
    res.status(201).json({ product: newProduct });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const productId = parseInt(id);

  // Validação do ID
  if (isNaN(productId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const { error, value } = updateProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const index = products.findIndex(p => p.id === productId);
  if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  products[index] = { ...products[index], ...value };
  res.status(200).json({ product: products[index] });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const productId = parseInt(id);


  if (isNaN(productId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  
  const index = products.findIndex(p => p.id === productId);
  if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }


  products.splice(index, 1);
  res.status(200).json({ message: 'Produto deletado com sucesso' });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};