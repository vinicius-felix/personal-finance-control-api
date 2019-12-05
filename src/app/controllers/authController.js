const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../../config/auth');
const router = express.Router();

// Gera o token(duração de 1 dia)
function generateToken(params = {}){
  return token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

// Rota para exibir lista de usuarios
router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: 'Error to show all users: ' + err })
  };
})

// Rota para registro de usuarios
router.post('/create', async (req, res) => {
  const { email } = req.body;

  try {
    if(await User.findOne({ email }))
      return res.status(400).send({ error: "User already exists. "});
    
    const user = await User.create(req.body);    
    user.password = undefined;
    return res.send({ user, token: generateToken({ id: user.id, email: user.email }) });

  } catch (err) {    
    return res.status(400).send({ error: "Registration failed! " + err });
  }

});

// Rota para listagem de usuarios
router.get('/show/:userId', async (req, res) => {
  try {
    const users = await User.findById(req.params.userId);
    return res.send({ users });
  } catch (err) {
    return res.status(400).send({ error: 'Error to show all users: ' + err })
  };
})

// Rota para alteracao de usuario
router.put('/update/:userId', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(req.params.userId, { name, email });
    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: 'Error to update a user: ' + err })
  };
});

// Rota para exclusao de usuario
router.delete('/delete/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.userId);
    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Error to remove a user: ' + err })
  };
});

// Rota para autenticação do usuario
router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  // Verifica se o usuario existe
  if(!user)
    return res.status(400).send({ error: "User not found." });

  // Compara a senha informada cadastrado com a senha do usuario
  if(!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: "Invalid password." });

  // Removendo a senha
  user.password = undefined;

  res.send({ user, token: generateToken({ id: user.id, email: user.email }) });
});

module.exports = app => app.use('/auth', router);