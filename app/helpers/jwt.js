import jwt from 'jsonwebtoken';

const SECRET = 'CALIXTOOOOOOO';

var signOptions = {
  expiresIn: "12h",
  algorithm: "HS256"
};

const generateJWT = (user) => {
  const payload = {
    id: user.id,
  };
  return jwt.sign(payload, SECRET, signOptions);
};

const verifyToken = (usertoken) => {
  const resp = jwt.verify(usertoken, SECRET);
  return resp;
}

export { generateJWT, verifyToken };