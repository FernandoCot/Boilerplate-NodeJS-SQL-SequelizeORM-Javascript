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

// The func below verifies if the token is still valid and/or if it exists
const verifyToken = (usertoken) => {
  const resp = jwt.verify(usertoken, SECRET);
  return resp;
}

export { generateJWT, verifyToken };