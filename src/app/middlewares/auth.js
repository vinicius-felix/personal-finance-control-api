const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Verifica se existe um token
  if(!authHeader)
    return res.status(401).send({ error: "No token provided." });

  // Separando o bearer do hash
  const parts = authHeader.split(' ');

  if(!parts.length === 2)
    return res.status(401).send({ error: "Token error." });

  const [ scheme, token ] = parts;

  if(!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Token malformatted." });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if(err)
      return res.status(401).send({ error: "Invalid token." });

    req.userId = decoded.id;
    req.name = decoded.name;
    req.email = decoded.email;
    
    return next();
  });

  // return next(); // remover

}