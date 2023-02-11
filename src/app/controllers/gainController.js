const express = require('express');
// const authMiddleware = require('../middlewares/auth')
const router = express.Router();
const Gain = require('../models/Gain');

// router.use(authMiddleware);

// Rota de listagem de todos os ganhos
router.get('/', async (req, res) => {
  try {
    const gains = await Gain.find().populate('user');
    return res.send({ gains });
  } catch (err) {
    return res.status(400).send({ error: 'Error to show all gains: ' + err })
  };
});

// Rota de exibir somente um ganho
router.get('/show/:gainId', async (req, res) => {
  try {
    const gain = await Gain.findById(req.params.gainId).populate('user');
    return res.send({ gain });
  } catch (err) {
    return res.status(400).send({ error: 'Error to show a gain: ' + err })
  };
});

// Rota para criação de ganho
router.post('/create', async (req, res) => {
  try {
    const gain = await Gain.create({...req.body, user: req.userId});
    return res.send({ gain });
  } catch (err) {
    return res.status(400).send({ error: 'Error to create a new gain: ' + err })
  };
});

// Rota para atualizar um ganho
router.put('/update/:gainId', async (req, res) => {
  try {
    const { description } = req.body;
    const gain = await Gain.findByIdAndUpdate(req.params.gainId, { description });
    return res.send({ gain });
  } catch (err) {
    return res.status(400).send({ error: 'Error to update a gain: ' + err })
  };
});

// Rota para exclusao de ganho
router.delete('/delete/:gainId', async (req, res) => {
  try {
    const gain = await Gain.findByIdAndRemove(req.params.gainId);
    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Error to remove a gain: ' + err })
  };
});

module.exports = app => app.use('/gains', router);