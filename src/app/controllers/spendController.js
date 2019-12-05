const express = require('express');
const authMiddleware = require('../middlewares/auth')
const router = express.Router();
const Spend = require('../models/Spend');

router.use(authMiddleware);

// Rota de listagem de todos os gastos
router.get('/', async (req, res) => {
  try {
    const spends = await Spend.find().populate('user');
    return res.send({ spends });
  } catch (err) {
    return res.status(400).send({ error: 'Error to show all spends: ' + err })
  };
});

// Rota de exibir somente um gasto
router.get('/show/:spendId', async (req, res) => {
  try {
    const spend = await Spend.findById(req.params.spendId);
    return res.send({ spend });
  } catch (err) {
    return res.status(400).send({ error: 'Error to show a spend: ' + err })
  };
});

// Rota para criação de gasto
router.post('/create', async (req, res) => {
  try {
    const spend = await Spend.create({...req.body, user: req.userId});
    return res.send({ spend });
  } catch (err) {
    return res.status(400).send({ error: 'Error to create a new spend: ' + err })
  };
});

// Rota para atualizar um gasto
router.put('/update/:spendId', async (req, res) => {
  try {
    const { category, description, value, date } = req.body;
    const spend = await Spend.findByIdAndUpdate(req.params.spendId, { category, description, value, date });
    return res.send({ spend });
  } catch (err) {
    return res.status(400).send({ error: 'Error to update a spend: ' + err })
  };
});

// Rota para exclusao de gasto
router.delete('/delete/:spendId', async (req, res) => {
  try {
    const spend = await Spend.findByIdAndRemove(req.params.spendId);
    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Error to remove a spend: ' + err })
  };
});

module.exports = app => app.use('/spends', router);