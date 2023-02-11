const express = require('express');
const authMiddleware = require('../middlewares/auth')
const router = express.Router();
const Category = require('../models/Category');

// router.use(authMiddleware);

// Rota de listagem de todos as categorias
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    return res.send({ categories });
  } catch (err) {
    return res.status(400).send({ error: 'Error to show all categories: ' + err })
  };
});

// Rota de exibir somente uma categoria
router.get('/show/:categoryId', async (req, res) => {
  try {
    const categories = await Category.findById(req.params.categoryId);
    return res.send({ categories });
  } catch (err) {
    return res.status(400).send({ error: 'Error to show a category: ' + err })
  };
});

// Rota para criação de categoria
router.post('/create', async (req, res) => {
  try {
    const category = await Category.create({...req.body, user: req.userId});
    return res.send({ category });
  } catch (err) {
    return res.status(400).send({ error: 'Error to create a new category: ' + err })
  };
});

// Rota para atualizar uma categoria
router.put('/update/:categoryId', async (req, res) => {
  try {
    const { name } = req.body;
    const categories = await Category.findByIdAndUpdate(req.params.categoryId, { name });
    return res.send({ categories });
  } catch (err) {
    return res.status(400).send({ error: 'Error to update a category: ' + err })
  };
});

// Rota para exclusao de categoria
router.delete('/delete/:categoryId', async (req, res) => {
  try {
    const categories = await Category.findByIdAndRemove(req.params.categoryId);
    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Error to remove a category: ' + err })
  };
});

module.exports = app => app.use('/categories', router);