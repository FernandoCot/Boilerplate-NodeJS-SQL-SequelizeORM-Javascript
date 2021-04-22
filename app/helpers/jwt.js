import jwt from 'jsonwebtoken';

const SECRET = 'AH9SHASHUAUHDUHSUHSADHAHUSDHU';

const signOptions = {
  expiresIn: '12h',
  algorithm: 'HS256',
};

const generateJWT = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  return jwt.sign(payload, SECRET, signOptions);
};

// The func below verifies if the token exists and if it's still valid
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json('Token não pode ser nulo!');

  jwt.verify(token, SECRET, (err) => {
    if (err) return res.status(401).json('Token expirado ou inválido!');
    next();
  });
};

const decodeJWT = (token) => {
  const decoded = jwt.verify(token, SECRET);
  // console.log(decoded)
  return decoded;
};

export { generateJWT, verifyToken, decodeJWT };
